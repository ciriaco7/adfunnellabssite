import React, { useState, useMemo } from 'react';
import { Logo } from './components/Logo';

// Form field definitions, previously in page-content.json
const formFields = [
  { name: 'name', label: 'Seu nome', type: 'text', required: true },
  { name: 'email', label: 'Seu melhor e-mail', type: 'email', required: true },
  { name: 'service', label: 'Qual serviço você oferece?', type: 'text', required: true },
  {
    name: 'revenue',
    label: 'Qual seu faturamento médio mensal?',
    type: 'select',
    required: true,
    options: [
      'Selecione uma opção',
      'Ainda não tenho faturamento',
      'Até R$ 5.000',
      'Entre R$ 5.000 e R$ 10.000',
      'Entre R$ 10.000 e R$ 20.000',
      'Acima de R$ 20.000',
    ],
    defaultValue: 'Selecione uma opção'
  }
];

const App: React.FC = () => {
  const initialFormState = useMemo(() => 
    formFields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {} as Record<string, string>),
    [] // No dependency needed as formFields is a constant
  );

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = formFields.every(field => {
      const value = formData[field.name];
      if (!field.required) return true;
      if (!value) return false;
      if (field.type === 'select' && value === field.options[0]) return false;
      return true;
    });

    if (isFormValid) {
      console.log('Form Data Submitted:', formData);
      setIsSubmitted(true);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  };

  const renderFormField = (field: any) => {
    const commonProps = {
      name: field.name,
      id: field.name,
      required: field.required,
      value: formData[field.name],
      onChange: handleChange,
      className: "w-full bg-black/20 border border-secondary/20 rounded-md p-3 text-secondary focus:ring-2 focus:ring-secondary/50 outline-none transition"
    };

    if (field.type === 'select') {
      return (
        <select {...commonProps} className={`${commonProps.className} appearance-none`} style={{ background: 'url(\'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23f5f5f5%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E\') no-repeat right .75rem center/8px 10px', backgroundColor: '#1c1c1e' }}>
          {field.options.map((option: string) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    }

    return <input type={field.type} {...commonProps} />;
  };

  return (
    <div className="min-h-screen bg-primary overflow-x-hidden">
      <header className="py-6 px-4">
        <div className="container mx-auto flex justify-center md:justify-start">
          <Logo />
        </div>
      </header>

      <main className="animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
        {/* Hero Section */}
        <section id="hero" className="container mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-br from-secondary to-zinc-400 bg-clip-text text-transparent">
              Pare de vender no escuro. Nós criamos o sistema que atrai clientes qualificados para você, todos os dias.
            </h1>
            <p className="text-lg md:text-xl text-secondary/80 max-w-3xl mx-auto mb-8 font-light">
              Para prestadores de serviço cansados da instabilidade. Construímos funis de venda automáticos que transformam anúncios em clientes, de forma previsível e lucrativa.
            </p>
            <a href="#qualificar" className="bg-secondary text-primary font-bold py-3 px-10 rounded-md text-lg hover:opacity-90 transition-opacity duration-300">
              Quero um sistema de vendas
            </a>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section id="solucao" className="py-20 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-br from-secondary to-zinc-400 bg-clip-text text-transparent">Sua prospecção parece uma aposta?</h2>
              <p className="text-secondary/70 max-w-2xl mx-auto font-light">Se você se identifica com um destes cenários, não está sozinho. É o sinal de que falta um sistema.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
               <div className="bg-primary/50 p-6 rounded-lg border border-secondary/10">
                  <h3 className="text-xl font-bold text-secondary mb-2">Clientes Desqualificados</h3>
                  <p className="text-secondary/70 font-light">Você perde tempo em reuniões com pessoas que não podem pagar ou não entendem o valor do seu serviço.</p>
               </div>
               <div className="bg-primary/50 p-6 rounded-lg border border-secondary/10">
                  <h3 className="text-xl font-bold text-secondary mb-2">Montanha-Russa de Faturamento</h3>
                  <p className="text-secondary/70 font-light">Um mês bom, outro ruim. A falta de previsibilidade impede seu crescimento e gera estresse constante.</p>
               </div>
               <div className="bg-primary/50 p-6 rounded-lg border border-secondary/10">
                  <h3 className="text-xl font-bold text-secondary mb-2">Dependência de Indicações</h3>
                  <p className="text-secondary/70 font-light">Seu negócio está à mercê da sorte e do 'boca a boca', sem um motor de crescimento que você controla.</p>
               </div>
            </div>
             <div className="text-center mt-16">
                 <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-br from-secondary to-zinc-400 bg-clip-text text-transparent">A solução: um funil de vendas sob medida.</h2>
                <p className="text-secondary/80 max-w-3xl mx-auto font-light text-lg">
                  Nós não vendemos 'posts' ou 'seguidores'. Nós construímos uma máquina de vendas para o seu negócio: um processo que atrai desconhecidos através de anúncios, qualifica-os automaticamente e agenda reuniões apenas com os leads mais preparados para comprar seu serviço de alto valor.
                </p>
             </div>
          </div>
        </section>

        {/* CTA Form Section */}
        <section id="qualificar" className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <div className="bg-black/20 border border-secondary/10 rounded-lg p-10 text-center">
                  <h2 className="text-3xl font-display text-secondary mb-3">Obrigado!</h2>
                  <p className="text-secondary/80 font-light">Recebemos suas informações. Em breve, nossa equipe entrará em contato para os próximos passos.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-br from-secondary to-zinc-400 bg-clip-text text-transparent">Pronto para ter previsibilidade?</h2>
                    <p className="text-secondary/70 max-w-2xl mx-auto font-light">Preencha o formulário e descubra se nosso sistema é a solução ideal para o seu momento. É rápido e sem compromisso.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {formFields.map(field => (
                      <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-secondary/80 mb-1">{field.label}</label>
                        {renderFormField(field)}
                      </div>
                    ))}
                    <div className="text-center pt-4">
                        <button type="submit" className="w-full bg-secondary text-primary font-bold py-4 px-10 rounded-md text-lg hover:opacity-90 transition-opacity duration-300">
                          Verificar Qualificação
                        </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-secondary/10 py-8">
        <div className="container mx-auto px-6 text-center text-secondary/50 font-light">
          <p>&copy; {new Date().getFullYear()} Ad Funnel Labs. Todos os direitos reservados.</p>
           <p className="text-sm mt-2">Transformando anúncios em ativos.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;