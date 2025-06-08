import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function LegalHelpPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">Central de Suporte</h1>
      <p className="text-muted-foreground text-center mb-8 dark:text-gray-400">
        Termos, privacidade e ajuda para utilizar a plataforma BeautyBook
      </p>

    <div className="max-w-3xl mx-auto mb-8">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 dark:text-pink-300" />
      <Input
        placeholder="Buscar por tópicos, dúvidas ou termos..."
        className="pl-10 bg-white text-gray-900 placeholder-gray-400 dark:bg-black dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:border-pink-400 dark:focus:border-pink-400 transition-colors"
      />
    </div>
    </div>

      <Tabs defaultValue="help" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="help">Centro de Ajuda</TabsTrigger>
          <TabsTrigger value="terms">Termos de Uso</TabsTrigger>
          <TabsTrigger value="privacy">Política de Privacidade</TabsTrigger>
        </TabsList>

        {/* Centro de Ajuda */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Centro de Ajuda</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-200">
                Tutoriais e respostas para as dúvidas mais frequentes sobre a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="help-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      Como criar e gerenciar minha conta?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Criando sua conta</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Acesse a página inicial e clique em "Registrar"</li>
                          <li>Preencha seus dados pessoais e informações de contato</li>
                          <li>Escolha uma senha segura (mínimo 8 caracteres)</li>
                          <li>Confirme seu email através do link enviado</li>
                          <li>Complete seu perfil com foto e preferências</li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Gerenciando sua conta</h4>
                        <p>Para gerenciar sua conta, acesse a página "Minha Conta" após fazer login. Lá você poderá:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Atualizar informações pessoais</li>
                          <li>Alterar sua senha</li>
                          <li>Gerenciar métodos de pagamento</li>
                          <li>Configurar notificações</li>
                          <li>Visualizar histórico de agendamentos</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-700">
                          <strong>Dica:</strong> Mantenha seu número de telefone atualizado para receber lembretes de
                          agendamentos.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="help-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-calendar"
                        >
                          <path d="M8 2v4" />
                          <path d="M16 2v4" />
                          <rect width="18" height="18" x="3" y="4" rx="2" />
                          <path d="M3 10h18" />
                        </svg>
                      </span>
                      Como agendar um serviço?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Passo a passo para agendamento</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Acesse a página "Serviços" no menu principal</li>
                          <li>Escolha a categoria de serviço desejada</li>
                          <li>Selecione o profissional de sua preferência</li>
                          <li>Escolha uma data e horário disponíveis</li>
                          <li>Confirme os detalhes do agendamento</li>
                          <li>Finalize o agendamento</li>
                        </ol>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-md">
                        <p className="text-sm text-amber-700">
                          <strong>Importante:</strong> Chegue com 10 minutos de antecedência. Cancelamentos devem ser
                          feitos com pelo menos 24h de antecedência para evitar cobranças.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Vídeo tutorial</h4>
                        <div className="bg-gray-100 rounded-md p-8 flex items-center justify-center">
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mx-auto text-gray-400"
                            >
                              <polygon points="6 3 18 12 6 21 6 3" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">Clique para assistir o tutorial</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="help-3">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-credit-card"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </span>
                      Como funcionam os pagamentos?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        Nossa plataforma oferece diversas opções de pagamento para sua conveniência. Você pode pagar
                        diretamente no salão ou realizar o pagamento antecipado através da plataforma.
                      </p>

                      <div>
                        <h4 className="font-medium mb-2">Métodos de pagamento aceitos</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Cartões de crédito (Visa, Mastercard, American Express)</li>
                          <li>Cartões de débito</li>
                          <li>PIX</li>
                          <li>Transferência bancária</li>
                          <li>Pagamento no local (dinheiro, cartão ou PIX)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Política de cancelamento</h4>
                        <p>
                          Cancelamentos realizados com mais de 24 horas de antecedência recebem reembolso total.
                          Cancelamentos com menos de 24 horas estão sujeitos a uma taxa de 30% do valor do serviço. Não
                          comparecimento sem aviso prévio não dá direito a reembolso.
                        </p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm text-green-700">
                          <strong>Dica:</strong> Cadastre seus cartões com antecedência para agilizar o processo de
                          pagamento.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="help-4">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                      Como avaliar um serviço?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        Suas avaliações são muito importantes para manter a qualidade dos serviços e ajudar outros
                        usuários a fazerem escolhas informadas.
                      </p>

                      <div>
                        <h4 className="font-medium mb-2">Como avaliar</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Após a conclusão do serviço, você receberá uma notificação</li>
                          <li>Acesse "Meus Agendamentos" e localize o serviço concluído</li>
                          <li>Clique em "Avaliar Serviço"</li>
                          <li>Atribua uma nota de 1 a 5 estrelas</li>
                          <li>Escreva um comentário sobre sua experiência (opcional)</li>
                          <li>Adicione fotos do resultado, se desejar (opcional)</li>
                          <li>Envie sua avaliação</li>
                        </ol>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-sm text-purple-700">
                          <strong>Importante:</strong> Avaliações podem ser editadas em até 7 dias após o serviço.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="help-5">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-100 text-pink-600 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-building-2"
                        >
                          <path d="M6 22V2a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v20" />
                          <path d="M18 11h.01" />
                          <path d="M18 14h.01" />
                          <path d="M18 17h.01" />
                          <path d="M18 20h.01" />
                          <path d="M10 7H7" />
                          <path d="M10 11H7" />
                          <path d="M10 15H7" />
                          <rect width="22" height="2" x="1" y="22" rx="1" />
                        </svg>
                      </span>
                      Sou profissional/salão, como me cadastrar?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Cadastro para profissionais</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Acesse a página inicial e clique em "Para Profissionais"</li>
                          <li>Escolha entre cadastro individual ou salão</li>
                          <li>Preencha as informações solicitadas (dados pessoais, especialidades, etc.)</li>
                          <li>Envie seus documentos para verificação (certificados, licenças)</li>
                          <li>Configure seu perfil, serviços e preços</li>
                          <li>Defina sua agenda e disponibilidade</li>
                          <li>Após aprovação, seu perfil estará visível para agendamentos</li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Documentos necessários</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Documento de identidade com foto</li>
                          <li>Certificados profissionais</li>
                          <li>Comprovante de endereço</li>
                          <li>CNPJ (para salões)</li>
                          <li>Alvará de funcionamento (para salões)</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-700">
                          <strong>Dica:</strong> Fotos profissionais e um perfil completo aumentam significativamente
                          suas chances de atrair clientes.
                        </p>
                      </div>

                      <Button className="w-full">Cadastrar como profissional</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Termos de Uso */}
        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Termos de Uso</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Última atualização: 07 de junho de 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-900 dark:text-gray-100">
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
              Ao utilizar a plataforma BeautyBook, você concorda com os termos e condições descritos abaixo. Por
              favor, leia atentamente.
            </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="terms-1">
                    <AccordionTrigger>1. Aceitação dos Termos</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Ao acessar ou utilizar o serviço BeautyBook, você concorda em cumprir estes Termos de Serviço e
                        todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está
                        proibido de usar ou acessar este site.
                      </p>
                      <p>
                        Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas
                        comerciais aplicáveis. Estes Termos de Serviço constituem um acordo legal entre você e
                        BeautyBook.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-2">
                    <AccordionTrigger>2. Uso da Licença</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou
                        software) no site BeautyBook, apenas para visualização transitória pessoal e não comercial. Esta
                        é a concessão de uma licença, não uma transferência de título.
                      </p>
                      <p className="mb-4">Sob esta licença, você não pode:</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Modificar ou copiar os materiais;</li>
                        <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
                        <li>
                          Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site
                          BeautyBook;
                        </li>
                        <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;</li>
                        <li>
                          Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro
                          servidor.
                        </li>
                      </ul>
                      <p>
                        Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá
                        ser rescindida por BeautyBook a qualquer momento.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-3">
                    <AccordionTrigger>3. Cadastro e Conta</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Para utilizar determinados recursos do serviço, você deve se registrar e criar uma conta. Ao se
                        registrar, você concorda em fornecer informações precisas, atuais e completas, e em mantê-las
                        atualizadas.
                      </p>
                      <p className="mb-4">
                        Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que
                        ocorrem em sua conta. Você concorda em notificar imediatamente a BeautyBook sobre qualquer uso
                        não autorizado de sua conta ou qualquer outra violação de segurança.
                      </p>
                      <p>
                        A BeautyBook não será responsável por quaisquer perdas ou danos decorrentes do seu não
                        cumprimento desta obrigação de segurança.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-4">
                    <AccordionTrigger>4. Agendamentos e Pagamentos</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Ao realizar um agendamento através da plataforma BeautyBook, você está estabelecendo um contrato
                        diretamente com o prestador de serviços, não com a BeautyBook. A BeautyBook atua apenas como
                        intermediária.
                      </p>
                      <p className="mb-4">
                        Você concorda em pagar integralmente todos os valores devidos pelos serviços agendados, conforme
                        as taxas e preços estabelecidos pelo prestador de serviços no momento do agendamento.
                      </p>
                      <p className="mb-4">Política de cancelamento:</p>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Cancelamentos com mais de 24 horas de antecedência: reembolso total</li>
                        <li>Cancelamentos com menos de 24 horas: sujeito a taxa de 30% do valor do serviço</li>
                        <li>Não comparecimento sem aviso prévio: não há direito a reembolso</li>
                      </ul>
                      <p>
                        A BeautyBook reserva-se o direito de reter taxas de serviço em caso de cancelamentos, conforme
                        política vigente.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-5">
                    <AccordionTrigger>5. Limitações de Responsabilidade</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Em nenhum caso a BeautyBook ou seus fornecedores serão responsáveis por quaisquer danos
                        (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos
                        negócios) decorrentes do uso ou da incapacidade de usar os materiais em BeautyBook, mesmo que
                        BeautyBook ou um representante autorizado da BeautyBook tenha sido notificado oralmente ou por
                        escrito da possibilidade de tais danos.
                      </p>
                      <p>
                        Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de
                        responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a
                        você.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-6">
                    <AccordionTrigger>6. Precisão dos Materiais</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Os materiais exibidos no site da BeautyBook podem incluir erros técnicos, tipográficos ou
                        fotográficos. BeautyBook não garante que qualquer material em seu site seja preciso, completo ou
                        atual. BeautyBook pode fazer alterações nos materiais contidos em seu site a qualquer momento,
                        sem aviso prévio.
                      </p>
                      <p>No entanto, BeautyBook não se compromete a atualizar os materiais.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-7">
                    <AccordionTrigger>7. Modificações</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        A BeautyBook pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio.
                        Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
                      </p>
                      <p>
                        É sua responsabilidade verificar periodicamente quaisquer alterações. O uso contínuo da
                        plataforma após a publicação de quaisquer modificações constitui aceitação dessas modificações.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="terms-8">
                    <AccordionTrigger>8. Lei Aplicável</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil e você se
                        submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                      </p>
                      <p>
                        Qualquer reclamação relacionada ao site BeautyBook deve ser apresentada dentro de um (1) ano
                        após a origem da causa da ação, caso contrário, tal causa de ação é permanentemente vedada.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Política de Privacidade */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Política de Privacidade</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">Última atualização: 07 de junho de 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-900 dark:text-gray-100">
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
              A BeautyBook valoriza sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas
              informações pessoais.
            </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="privacy-1">
                    <AccordionTrigger>1. Informações que Coletamos</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">Coletamos os seguintes tipos de informações:</p>

                      <h4 className="font-medium mb-2">Informações Pessoais</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Nome completo</li>
                        <li>Endereço de e-mail</li>
                        <li>Número de telefone</li>
                        <li>Endereço físico</li>
                        <li>Data de nascimento</li>
                        <li>Foto de perfil (opcional)</li>
                        <li>
                          Informações de pagamento (processadas de forma segura por nossos parceiros de pagamento)
                        </li>
                      </ul>

                      <h4 className="font-medium mb-2">Informações de Uso</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Histórico de agendamentos</li>
                        <li>Preferências de serviços</li>
                        <li>Avaliações e comentários</li>
                        <li>Interações com a plataforma</li>
                        <li>Dados de localização (com sua permissão)</li>
                      </ul>

                      <h4 className="font-medium mb-2">Informações Técnicas</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Endereço IP</li>
                        <li>Tipo de navegador</li>
                        <li>Sistema operacional</li>
                        <li>Identificadores de dispositivos</li>
                        <li>Dados de cookies e tecnologias similares</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-2">
                    <AccordionTrigger>2. Como Usamos Suas Informações</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">Utilizamos suas informações para os seguintes fins:</p>

                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>
                          <strong>Fornecer nossos serviços:</strong> Processar agendamentos, facilitar pagamentos,
                          enviar confirmações e lembretes.
                        </li>
                        <li>
                          <strong>Personalização:</strong> Adaptar nossa plataforma às suas preferências e histórico de
                          uso.
                        </li>
                        <li>
                          <strong>Comunicação:</strong> Enviar notificações sobre seus agendamentos, promoções,
                          atualizações de serviços e responder às suas solicitações.
                        </li>
                        <li>
                          <strong>Melhorias:</strong> Analisar o uso da plataforma para melhorar nossos serviços,
                          desenvolver novos recursos e otimizar a experiência do usuário.
                        </li>
                        <li>
                          <strong>Segurança:</strong> Proteger nossa plataforma, detectar e prevenir fraudes, abusos e
                          atividades não autorizadas.
                        </li>
                        <li>
                          <strong>Conformidade legal:</strong> Cumprir obrigações legais e regulatórias aplicáveis.
                        </li>
                      </ul>

                      <p>
                        Processamos suas informações com base no consentimento fornecido, na execução de um contrato com
                        você, em nossos interesses legítimos ou para cumprir obrigações legais.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-3">
                    <AccordionTrigger>3. Compartilhamento de Informações</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">Podemos compartilhar suas informações com:</p>

                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>
                          <strong>Profissionais e salões:</strong> Compartilhamos suas informações necessárias para a
                          prestação dos serviços agendados (nome, preferências, histórico de serviços).
                        </li>
                        <li>
                          <strong>Provedores de serviços:</strong> Empresas que nos ajudam a operar nossa plataforma
                          (processamento de pagamentos, hospedagem, análise de dados, atendimento ao cliente).
                        </li>
                        <li>
                          <strong>Parceiros de marketing:</strong> Com seu consentimento, podemos compartilhar
                          informações com parceiros de marketing para oferecer promoções relevantes.
                        </li>
                        <li>
                          <strong>Requisitos legais:</strong> Quando necessário para cumprir com obrigações legais,
                          responder a processos legais ou proteger nossos direitos.
                        </li>
                      </ul>

                      <p className="mb-4">
                        <strong>Não vendemos suas informações pessoais a terceiros.</strong>
                      </p>

                      <p>
                        Todos os terceiros com quem compartilhamos dados estão sujeitos a rigorosas obrigações de
                        confidencialidade e proteção de dados.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-4">
                    <AccordionTrigger>4. Segurança de Dados</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações
                        pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Estas medidas
                        incluem:
                      </p>

                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>Criptografia de dados sensíveis</li>
                        <li>Firewalls e sistemas de detecção de intrusão</li>
                        <li>Acesso restrito a informações pessoais</li>
                        <li>Monitoramento regular de sistemas para detectar vulnerabilidades</li>
                        <li>Treinamento de segurança para funcionários</li>
                        <li>Auditorias de segurança periódicas</li>
                      </ul>

                      <p className="mb-4">
                        Embora nos esforcemos para proteger suas informações pessoais, nenhum método de transmissão pela
                        Internet ou método de armazenamento eletrônico é 100% seguro. Portanto, não podemos garantir sua
                        segurança absoluta.
                      </p>

                      <p>
                        Em caso de violação de dados que possa afetar sua privacidade ou segurança, notificaremos você e
                        as autoridades competentes conforme exigido por lei.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-5">
                    <AccordionTrigger>5. Seus Direitos de Privacidade</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas
                        informações pessoais:
                      </p>

                      <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>
                          <strong>Acesso:</strong> Solicitar uma cópia das informações pessoais que mantemos sobre você.
                        </li>
                        <li>
                          <strong>Retificação:</strong> Corrigir informações imprecisas ou incompletas.
                        </li>
                        <li>
                          <strong>Exclusão:</strong> Solicitar a exclusão de suas informações pessoais em determinadas
                          circunstâncias.
                        </li>
                        <li>
                          <strong>Restrição:</strong> Solicitar a limitação do processamento de suas informações.
                        </li>
                        <li>
                          <strong>Portabilidade:</strong> Receber suas informações pessoais em formato estruturado e
                          transferi-las para outro provedor.
                        </li>
                        <li>
                          <strong>Objeção:</strong> Opor-se ao processamento de suas informações para determinadas
                          finalidades.
                        </li>
                        <li>
                          <strong>Retirada de consentimento:</strong> Retirar qualquer consentimento previamente
                          fornecido.
                        </li>
                      </ul>

                      <p className="mb-4">
                        Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail
                        privacy@beautybook.com ou através da seção "Minha Conta" na plataforma.
                      </p>

                      <p>
                        Responderemos à sua solicitação dentro do prazo exigido pela lei aplicável (geralmente 30 dias).
                        Podemos solicitar informações adicionais para verificar sua identidade antes de atender à sua
                        solicitação.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-6">
                    <AccordionTrigger>6. Cookies e Tecnologias Similares</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência em nossa plataforma,
                        entender como você interage com nossos serviços e personalizar conteúdo e anúncios.
                      </p>

                      <h4 className="font-medium mb-2">Tipos de cookies que utilizamos:</h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        <li>
                          <strong>Cookies essenciais:</strong> Necessários para o funcionamento da plataforma. Não podem
                          ser desativados.
                        </li>
                        <li>
                          <strong>Cookies de preferências:</strong> Permitem que a plataforma lembre suas escolhas e
                          preferências.
                        </li>
                        <li>
                          <strong>Cookies analíticos:</strong> Ajudam-nos a entender como os visitantes interagem com a
                          plataforma.
                        </li>
                        <li>
                          <strong>Cookies de marketing:</strong> Utilizados para rastrear visitantes em sites e exibir
                          anúncios relevantes.
                        </li>
                      </ul>

                      <p className="mb-4">
                        Você pode gerenciar suas preferências de cookies através das configurações do seu navegador ou
                        através do nosso banner de cookies ao acessar a plataforma pela primeira vez.
                      </p>

                      <p>
                        Observe que bloquear alguns tipos de cookies pode afetar sua experiência em nosso site e os
                        serviços que podemos oferecer.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-7">
                    <AccordionTrigger>7. Alterações nesta Política</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas
                        práticas de informação ou obrigações legais. Publicaremos a política revisada nesta página com
                        uma data de "última atualização" atualizada.
                      </p>

                      <p className="mb-4">
                        Recomendamos que você revise esta política periodicamente para se manter informado sobre como
                        protegemos suas informações. Alterações significativas serão notificadas através de um aviso
                        proeminente em nossa plataforma ou por e-mail.
                      </p>

                      <p>
                        O uso contínuo de nossos serviços após tais modificações constitui sua aceitação da Política de
                        Privacidade revisada.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="privacy-8">
                    <AccordionTrigger>8. Contato</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-4">
                        Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade
                        ou ao processamento de suas informações pessoais, entre em contato conosco:
                      </p>

                      <div className="mb-4">
                        <p>
                          <strong>E-mail:</strong> privacy@beautybook.com
                        </p>
                        <p>
                          <strong>Endereço:</strong> Av. Paulista, 1000, São Paulo, SP, Brasil
                        </p>
                        <p>
                          <strong>Telefone:</strong> (11) 5555-5555
                        </p>
                      </div>

                      <p className="mb-4">
                        Nosso Encarregado de Proteção de Dados (DPO) pode ser contatado diretamente em:
                        dpo@beautybook.com
                      </p>

                      <p>
                        Se você estiver insatisfeito com nossa resposta, você tem o direito de apresentar uma reclamação
                        à autoridade de proteção de dados competente.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    <div className="mt-10 text-center">
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        Ainda tem dúvidas?{" "}
        <a
        href="/about-us"
        className="text-pink-600 dark:text-pink-400 hover:underline"
        >
        Entre em contato com nossa equipe de suporte
        </a>
      </p>
    </div>
    </div>
  )
}
