import { Request, Response } from "express";
import admin from '../config/firebase';
import { getStorage } from "firebase-admin/storage";

export async function updateProfessionalProfile(req: Request, res: Response) {
  const uid = req.users?.uid;
  const data = req.body;
  if (!uid) return res.status(401).json({ error: "Usuário não autenticado" });
  try {
    await admin.firestore().collection('users').doc(uid).update(data);
    await admin.firestore().collection('professionals').doc(uid).update(data);
    res.status(200).json({ message: "Perfil atualizado com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao atualizar perfil", details: error.message });
  }
}

export async function updateAvailability(req: Request, res: Response) {
  const uid = req.users?.uid
  const { availability } = req.body;

  if (!uid) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  if (!availability) {
    return res.status(400).json({ error: "Disponibilidade não fornecida" });
  }

  try {
    await admin.firestore().collection('users').doc(uid).update({ availability });
    await admin.firestore().collection('professionals').doc(uid).update({ availability });

    res.status(200).json({ message: "Disponibilidade atualizada com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao atualizar disponibilidade", details: error.message });
  }
}

export async function listProfessionalAppointments(req: Request, res: Response) {
  const professionalId = req.users?.uid;

  if (!professionalId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  try {
    const snapshot = await admin.firestore()
      .collection('appointments')
      .where('professionalId', '==', professionalId)
      .orderBy('date', 'asc')
      .get();

    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ appointments });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao listar agendamentos", details: error.message });
  }
}

export async function updateServiceDuration(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { serviceId } = req.params;
  const { duration } = req.body;

  if (!professionalId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  if (!serviceId || !duration) {
    return res.status(400).json({ error: "ID do serviço ou duração não fornecidos" });
  }

  try {
    const serviceRef = admin.firestore().collection('services').doc(serviceId);
    const serviceDoc = await serviceRef.get();

    if (!serviceDoc.exists) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    }

    const service = serviceDoc.data();

    const userDoc = await admin.firestore().collection('users').doc(professionalId).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== "professional" || userData.salonId !== service?.salonId) {
      return res.status(403).json({ error: "Você não tem permissão para editar este serviço" });
    }

    await serviceRef.update({ duration });

    res.status(200).json({ message: "Duração do serviço atualizada com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao atualizar duração do serviço", details: error.message });
  }
}

export async function registerProfessional(req: Request, res: Response) {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
  }

  try {
    // Criação do usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone
    });

    // Dados do profissional
    const professionalData = {
      uid: userRecord.uid,
      name,
      email,
      phone,
      role: "professional",
      createdAt: new Date(),
      salonId: null // autônomo inicialmente
    };


    await admin.firestore().collection('users').doc(userRecord.uid).set(professionalData);
    await admin.firestore().collection('professionals').doc(userRecord.uid).set(professionalData);

    res.status(201).json({ message: "Profissional cadastrado com sucesso", uid: userRecord.uid });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao cadastrar profissional", details: error.message });
  }
}

// pega o perfil do profissional logado
export async function getProfessionalProfile(req: Request, res: Response) {
  const uid = req.users?.uid;
  if (!uid) return res.status(401).json({ error: "Usuário não autenticado" });
  const userDoc = await admin.firestore().collection('users').doc(uid).get();
  if (!userDoc.exists) return res.status(404).json({ error: "Usuário não encontrado" });
  return res.status(200).json(userDoc.data());
}

// Upload da foto de perfil do profissional
export async function uploadProfessionalProfilePicture(req: any, res: any) {
  const uid = req.users?.uid;
  if (!uid) return res.status(401).json({ error: "Não autenticado" });
  if (!req.file) return res.status(400).json({ error: "Nenhuma imagem enviada" });

  const bucket = getStorage().bucket();
  const fileName = `profile_photos/${uid}_${Date.now()}.jpg`;
  const file = bucket.file(fileName);

  await file.save(req.file.buffer, {
    metadata: { contentType: req.file.mimetype }
  });

  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2491"
  });

  // Salva a URL no Firestore
  await admin.firestore().collection("users").doc(uid).update({ avatar: url });

  return res.json({ avatar: url });
}

// Lista os serviços do profissional logado
export async function listOwnServices(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  if (!professionalId) return res.status(401).json({ error: "Usuário não autenticado" });

  try {
    const snapshot = await admin.firestore()
      .collection('services')
      .where('professionalId', '==', professionalId)
      .get();

    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ services });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao listar serviços", details: error.message });
  }
}

// Listar todos os serviços públicos de profissionais independentes
export async function listPublicProfessionalServices(req: Request, res: Response) {
  try {
    // Busca todos os serviços ativos (sem filtrar por salonId)
    const snapshot = await admin.firestore()
      .collection('services')
      .where('active', '==', true)
      .get();

    const services = await Promise.all(snapshot.docs.map(async (doc) => {
      const data = doc.data();
      let professional = null;
      if (data.professionalId) {
        const profDoc = await admin.firestore().collection('professionals').doc(data.professionalId).get();
        professional = profDoc.exists ? profDoc.data() : null;
      }
      return {
        id: doc.id,
        ...data,
        professional: professional
          ? {
            id: data.professionalId,
            name: professional.name,
            avatar: professional.avatar || "",
            rating: professional.rating || 4.8,
            reviews: professional.reviews || 0,
            experience: professional.experience || "",
            location: professional.location || "",
          }
          : null,
      };
    }));

    res.status(200).json({ services });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao listar serviços públicos", details: error.message });
  }
}

export async function createProfessionalService(req: Request, res: Response) {
    const professionalId = req.users?.uid;
    const { name, description, price, duration, category, image } = req.body; // <-- inclua image

    if (!professionalId || !name || !price || !duration || !category) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const serviceRef = await admin.firestore().collection('services').add({
            professionalId,
            name,
            description,
            duration,
            price,
            category,
            image: image || "", 
            active: true,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: "Serviço criado com sucesso", serviceId: serviceRef.id });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao cadastrar serviço", details: error.message });
    }
}

// Editar serviço do profissional
export async function editProfessionalService(req: Request, res: Response) {
    const professionalId = req.users?.uid;
    const { id } = req.params;
    const { name, description, price, duration, category, image } = req.body; // <-- inclua image

    if (!professionalId || !id) {
        return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
    }

    try {
        const serviceRef = admin.firestore().collection('services').doc(id);
        const serviceDoc = await serviceRef.get();
        if (!serviceDoc.exists) return res.status(404).json({ error: "Serviço não encontrado" });
        const service = serviceDoc.data();
        if (service?.professionalId !== professionalId) {
            return res.status(403).json({ error: "Você não tem permissão para editar este serviço" });
        }
        await serviceRef.update({ name, description, price, duration, category, image: image || "" }); // <-- atualiza image
        res.status(200).json({ message: "Serviço atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao editar serviço", details: error.message });
    }
}

export async function deleteProfessionalService(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { id } = req.params;

  if (!professionalId || !id) {
    return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
  }

  try {
    const serviceRef = admin.firestore().collection('services').doc(id);
    const serviceDoc = await serviceRef.get();
    if (!serviceDoc.exists) return res.status(404).json({ error: "Serviço não encontrado" });
    const service = serviceDoc.data();
    if (service?.professionalId !== professionalId) {
      return res.status(403).json({ error: "Você não tem permissão para excluir este serviço" });
    }
    await serviceRef.delete();
    res.status(200).json({ message: "Serviço deletado com sucesso" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao deletar serviço", details: error.message });
  }
}

// Adicionar certificação
export async function addCertification(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { name, institution, year, document } = req.body;
  if (!professionalId || !name || !institution || !year) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }
  try {
    const certRef = await admin.firestore().collection('certifications').add({
      professionalId,
      name,
      institution,
      year,
      document: document || "",
      verified: false,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: "Certificação adicionada", id: certRef.id });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao adicionar certificação", details: error.message });
  }
}

// Listar certificações do profissional
export async function listCertifications(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  if (!professionalId) return res.status(401).json({ error: "Não autenticado" });
  try {
    const snap = await admin.firestore().collection('certifications').where('professionalId', '==', professionalId).get();
    const certifications = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ certifications });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao listar certificações", details: error.message });
  }
}

// Excluir certificação
export async function deleteCertification(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { id } = req.params;
  if (!professionalId || !id) return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
  try {
    const certRef = admin.firestore().collection('certifications').doc(id);
    const certDoc = await certRef.get();
    if (!certDoc.exists) return res.status(404).json({ error: "Certificação não encontrada" });
    if (certDoc.data()?.professionalId !== professionalId) return res.status(403).json({ error: "Sem permissão" });
    await certRef.delete();
    res.status(200).json({ message: "Certificação excluída" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao excluir certificação", details: error.message });
  }
}

// Adicionar item ao portfólio
export async function addPortfolioItem(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { title, description, image } = req.body;
  if (!professionalId || !title || !image) {
    return res.status(400).json({ error: "Título e imagem são obrigatórios" });
  }
  try {
    const ref = await admin.firestore().collection('portfolio').add({
      professionalId,
      title,
      description: description || "",
      image,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ message: "Item adicionado ao portfólio", id: ref.id });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao adicionar item", details: error.message });
  }
}

// Listar portfólio do profissional
export async function listPortfolio(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  if (!professionalId) return res.status(401).json({ error: "Não autenticado" });
  try {
    const snap = await admin.firestore().collection('portfolio').where('professionalId', '==', professionalId).get();
    const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ portfolio: items });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao listar portfólio", details: error.message });
  }
}

// Editar item do portfólio
export async function editPortfolioItem(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { id } = req.params;
  const { title, description, image } = req.body;
  if (!professionalId || !id) return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
  try {
    const ref = admin.firestore().collection('portfolio').doc(id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: "Item não encontrado" });
    if (doc.data()?.professionalId !== professionalId) return res.status(403).json({ error: "Sem permissão" });
    await ref.update({ title, description, image });
    res.status(200).json({ message: "Item atualizado" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao editar item", details: error.message });
  }
}

// Deletar item do portfólio
export async function deletePortfolioItem(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  const { id } = req.params;
  if (!professionalId || !id) return res.status(400).json({ error: "Dados obrigatórios não fornecidos" });
  try {
    const ref = admin.firestore().collection('portfolio').doc(id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: "Item não encontrado" });
    if (doc.data()?.professionalId !== professionalId) return res.status(403).json({ error: "Sem permissão" });
    await ref.delete();
    res.status(200).json({ message: "Item excluído" });
  } catch (error: any) {
    return res.status(400).json({ error: "Erro ao excluir item", details: error.message });
  }
}

// Rota para obter o perfil público de um profissional
export async function getPublicProfessionalProfile(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "ID não informado" });
  try {
    const doc = await admin.firestore().collection("professionals").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Profissional não encontrado" });
    const data = doc.data();
    res.status(200).json({ profile: { ...data, uid: id } });
  } catch (error: any) {
    res.status(400).json({ error: "Erro ao buscar perfil público", details: error.message });
  }
}

// Dashboard do profissional
export async function professionalDashboard(req: Request, res: Response) {
  const professionalId = req.users?.uid;
  if (!professionalId) return res.status(401).json({ error: "Usuário não autenticado" });
  const db = admin.firestore();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // Agendamentos de hoje
  const todaySnap = await db.collection("appointments")
    .where("professionalId", "==", professionalId)
    .where("date", "==", todayStr)
    .get();
  const todayAppointments = todaySnap.size;

  // Agendamentos de ontem
  const yesterdaySnap = await db.collection("appointments")
    .where("professionalId", "==", professionalId)
    .where("date", "==", yesterdayStr)
    .get();
  const yesterdayAppointments = yesterdaySnap.size;

  // Receita do mês atual
  const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayMonthStr = firstDayMonth.toISOString().split("T")[0];
  const monthSnap = await db.collection("appointments")
    .where("professionalId", "==", professionalId)
    .where("date", ">=", firstDayMonthStr)
    .where("status", "==", "completed")
    .get();
  let monthRevenue = 0;
  monthSnap.forEach(doc => {
    monthRevenue += doc.data().servicePrice || 0;
  });

  // Receita do mês anterior
  const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const firstDayLastMonthStr = firstDayLastMonth.toISOString().split("T")[0];
  const lastDayLastMonthStr = lastMonth.toISOString().split("T")[0];
  const lastMonthSnap = await db.collection("appointments")
    .where("professionalId", "==", professionalId)
    .where("date", ">=", firstDayLastMonthStr)
    .where("date", "<=", lastDayLastMonthStr)
    .where("status", "==", "completed")
    .get();
  let lastMonthRevenue = 0;
  lastMonthSnap.forEach(doc => {
    lastMonthRevenue += doc.data().servicePrice || 0;
  });

  // Novos clientes do mês atual
  const clientsThisMonth = new Set<string>();
  monthSnap.forEach(doc => {
    clientsThisMonth.add(doc.data().clientId);
  });

  // Novos clientes do mês anterior
  const clientsLastMonth = new Set<string>();
  lastMonthSnap.forEach(doc => {
    clientsLastMonth.add(doc.data().clientId);
  });

  // Avaliações
  const reviewsSnap = await db.collection("appointments")
    .where("professionalId", "==", professionalId)
    .where("rating", ">=", 1)
    .get();
  let totalRating = 0;
  let totalReviews = 0;
  reviewsSnap.forEach(doc => {
    totalRating += doc.data().rating || 0;
    totalReviews++;
  });
  const avgRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  res.json({
    todayAppointments,
    todayAppointmentsChange: yesterdayAppointments === 0 ? 100 : ((todayAppointments - yesterdayAppointments) / yesterdayAppointments) * 100,
    monthRevenue,
    monthRevenueChange: lastMonthRevenue === 0 ? 100 : ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100,
    newClients: clientsThisMonth.size,
    newClientsChange: clientsLastMonth.size === 0 ? 100 : ((clientsThisMonth.size - clientsLastMonth.size) / clientsLastMonth.size) * 100,
    avgRating,
    totalReviews
  });
}