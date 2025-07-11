import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Target, Lightbulb, Package, Route, Share2, DollarSign, Users, Briefcase, ChevronDown, ChevronUp, CheckCircle, Clock, XCircle, TrendingUp, Link as LinkIcon, AlertTriangle, ListChecks, Mail, RefreshCw } from 'lucide-react';

// --- Comprehensive Data for the Interactive Business Plan ---

const planData = {
  executiveSummary: {
    title: "Resumen Ejecutivo",
    icon: FileText,
    points: [
      { title: "La Oportunidad", content: "Capitalizar una oportunidad única comercializando un conjunto de herramientas SaaS B2B, ya desarrolladas y probadas con éxito en Iguana Sell, para resolver la fragmentación de datos y la ineficiencia operativa de los comerciantes de Shopify." },
      { title: "El Producto", content: "Lanzar aplicaciones modulares (Recuperación de Ventas y Logística Paperless) en la Shopify App Store con una estrategia de 'Land and Expand', para consolidarlas a largo plazo en una suite integrada." },
      { title: "Mercado y Tracción", content: "El mercado objetivo inicial son los más de 46,000 comerciantes de Shopify Plus. La validación se basa en los resultados tangibles de Iguana Sell: +849 ventas recuperadas y una reducción del 90% en el tiempo de gestión de envíos." },
      { title: "Requerimiento Financiero", content: "Se busca una ronda de financiación inicial de 650.000 € para un runway de 24 meses, destinados a desarrollo (50%), ventas y marketing (35%), y G&A (15%). Se proyecta alcanzar el punto de equilibrio dentro del runway de la financiación." },
    ]
  },
  opportunity: {
    title: "La Oportunidad",
    icon: Lightbulb,
    painPoints: [
        { title: "Fragmentación de Datos", text: "Datos críticos dispersos en silos (Shopify, Klaviyo, ERPs) impiden una visión unificada y decisiones inteligentes.", icon: XCircle, color: "text-red-400" },
        { title: "Ineficiencia Operativa", text: "Procesos manuales en logística y reporting consumen horas y generan errores costosos.", icon: Clock, color: "text-yellow-400" },
        { title: "Pérdida de Ingresos", text: "Las herramientas estándar no recuperan ventas a largo plazo, dejando miles de euros sobre la mesa.", icon: DollarSign, color: "text-red-400" }
    ],
    marketSize: [
        { name: "TAM", value: 4800000, description: "Tiendas activas en Shopify a nivel mundial." },
        { name: "SAM", value: 1000000, description: "Comerciantes B2C/B2B con operaciones significativas." },
        { name: "SOM", value: 46000, description: "Nuestro foco: Comerciantes de Shopify Plus." },
    ]
  },
  product: {
    title: "Producto y Roadmap",
    icon: Package,
    modules: [
        { 
            name: "Iguana Revenue Recovery", 
            code: "A.6", 
            description: "Recupera ventas perdidas a largo plazo que tus otras apps ignoran, conectando la intención de compra pasada con la disponibilidad de stock actual.", 
            user: "Director de E-commerce", 
            status: "Funcional, requiere UI/UX.",
            roi: "Aumento directo de los ingresos recuperando ventas que se daban por perdidas para siempre.",
            features: [
                { name: "Recuperador Proactivo de Ventas", code: "A.6", description: "Identifica y gestiona carritos abandonados, consultas de stock (ETD) y pedidos cancelados, contactando al cliente cuando la oportunidad de venta se reactiva." },
                { name: "Constructor de Perfiles de Interés", code: "A.6.3", description: "Registra los intereses de producto de cada cliente a largo plazo para futuras campañas de marketing hiper-segmentadas." }
            ]
        },
        { 
            name: "Iguana Global Ship", 
            code: "B.1", 
            description: "Automatiza el 100% de tu documentación aduanera internacional, incluso para bundles complejos, eliminando errores y ahorrando horas de trabajo manual.", 
            user: "Jefe de Operaciones", 
            status: "Funcional, requiere parametrización.",
            roi: "Reducción drástica de costes operativos, eliminación de riesgo operacional y aumento de la satisfacción del cliente por la rapidez en aduanas.",
            features: [
                { name: "Generación Automática de Etiquetas", code: "B.1", description: "Crea etiquetas de envío para múltiples transportistas (DHL, Fedex) sin intervención manual." },
                { name: "Documentación Aduanera Paperless", code: "B.1", description: "Genera y transmite electrónicamente facturas comerciales y declaraciones aduaneras, acelerando el despacho en aduanas." },
                { name: "Gestión Avanzada de Bundles", code: "B.1", description: "Maneja correctamente productos compuestos por múltiples SKUs, un punto débil de competidores como Shiptheory." }
            ]
        },
        { 
            name: "Iguana Catalog Intel", 
            code: "A.1-A.5, A.7", 
            description: "Enriquece y optimiza tu catálogo de productos, integrando stock de proveedores, analizando la calidad de los anuncios y priorizando SKUs clave.", 
            user: "Brand Manager", 
            status: "Funcional, requiere modularización.",
            roi: "Aumento de la tasa de conversión y eficiencia de la inversión en marketing al optimizar la presentación del catálogo y enfocar los recursos en los productos de mayor impacto.",
            features: [
                { name: "Integrador de Stock Virtual", code: "A.1", description: "Sincroniza el stock de tus proveedores con tu tienda Shopify, ampliando tu catálogo sin riesgo de inventario." },
                { name: "Auditor de Calidad de Anuncios (KyQ)", code: "A.2", description: "Analiza y puntúa la calidad de tus fichas de producto (fotos, EANs, descripciones) para identificar puntos de mejora." },
                { name: "Priorizador de SKUs para Marketing", code: "A.3, A.4", description: "Identifica tus productos más importantes basándose en hits de la web y ventas para optimizar la inversión en Google Ads y campañas." },
                { name: "Gestor Inteligente de Colecciones", code: "A.5", description: "Ordena automáticamente los productos dentro de las colecciones de Shopify basándose en popularidad (hits), novedad o precio para maximizar la conversión." },
                { name: "Hermanamiento de Productos por Variante", code: "A.7", description: "Vincula productos de la misma colección pero con distinto color/acabado para mejorar la experiencia de usuario y la navegación." }
            ]
        },
        { 
            name: "Iguana Ops Control", 
            code: "C.1-C.6, D.1-D.2", 
            description: "Monitoriza la salud de tu operación con alertas proactivas y consolida tus KPIs en un dashboard unificado para un control total del negocio.", 
            user: "CEO, COO, IT Manager", 
            status: "Funcional, requiere adaptación.",
            roi: "Transforma datos brutos en inteligencia de negocio accionable, permitiendo una toma de decisiones estratégica basada en una visión completa y no fragmentada de la empresa.",
            features: [
                { name: "Sistema de Alertas Operativas", code: "C.1-C.6", description: "Recibe reportes diarios por email que monitorizan la validez de certificados, el tamaño de las webs, la ejecución de procesos clave, etc." },
                { name: "Análisis de Rentabilidad por Pedido", code: "D.1", description: "Consolida en una única vista el coste real del producto (FIFO), el coste de envío y el precio de venta para calcular el margen exacto por cada venta." },
                { name: "Dashboard de KPIs Transversales", code: "D.2", description: "Visualiza los indicadores clave de rendimiento (KPIs) de todas las áreas del negocio (Marketing, Ventas, Logística, IT) en un único panel." }
            ]
        },
    ],
    roadmap: [
        { phase: "Fase 1: Lanzamiento y Validación", date: "Q3 2025 - Q4 2026", objectives: "Validar mercado, conseguir 100 clientes de pago, alcanzar break-even.", devFocus: "Lanzamiento de apps 'Revenue Recovery' y 'Global Ship'.", color: "bg-teal-500" },
        { phase: "Fase 2: Expansión y Consolidación", date: "2027", objectives: "Escalar clientes, aumentar ARPU, fortalecer plataforma.", devFocus: "Lanzamiento de módulos 'Catalog Intel' y 'Ops Control'.", color: "bg-sky-500" },
        { phase: "Fase 3: Hacia la Suite Inteligente", date: "2028+", objectives: "Liderar el mercado con una oferta integrada y predictiva.", devFocus: "Lanzamiento de 'Iguana Tech Suite' y capa de IA.", color: "bg-indigo-500" },
    ]
  },
  marketGTM: {
    title: "Mercado y Go-to-Market",
    icon: Target,
    icp: [
        "Comerciante en Shopify Plus o Advanced",
        "Ingresos anuales > €1 millón",
        "Operaciones internacionales y/o catálogo complejo (>250 SKUs)",
        "Usa un stack tecnológico avanzado (Klaviyo, ERP, etc.)"
    ],
    gtmStrategy: [
        { title: "Dominio de la Shopify App Store", points: ["SEO de Listing", "Estrategia de Reseñas", "Modelo Freemium/Trial", "Programa de Partners para Agencias."] },
        { title: "Motor de Marketing Multicanal", points: ["Marketing de Contenidos (Casos de éxito de Iguana Sell)", "Publicidad de Pago segmentada", "Construcción de Comunidad."] },
        { title: "Estrategia de Precios por Valor", points: ["Modelo 'Tiered-Based' (Free, Starter, Growth, Pro, Enterprise).", "Posicionamiento premium justificado por funcionalidades superiores.", "El precio como mecanismo de cualificación de leads."] },
    ]
  },
  financials: {
    title: "Plan Financiero",
    icon: DollarSign,
    assumptions: {
        funding: { ask: 650000, runway: 24 },
        initialTeamCost: 180000, // Salarios Anuales Año 1 (1 PM, 2 Devs, 1 Growth)
        marketingBudget: 48000, // Anual Año 1
        g_a_cost: 18000, // Anual
        cogs_rate: 0.25, // 20% comisiones + 5% infra
        conversion_rate: 0.05, // free to paid
    },
    useOfFunds: [
        { name: 'Desarrollo (R&D)', value: 50, color: '#0088FE' },
        { name: 'Ventas y Marketing (S&M)', value: 35, color: '#00C49F' },
        { name: 'G&A y Contingencia', value: 15, color: '#FFBB28' },
    ],
  },
  team: {
    title: "Equipo y Operativa",
    icon: Users,
    founders: [
        { name: "José (CEO)", role: "Liderazgo, visión estratégica, relación con inversores y ventas clave." },
        { name: "Julián J. Fuertes (CIO/CTO)", role: "Arquitectura técnica, hoja de ruta de producto y gestión del equipo de desarrollo." },
    ],
    initialHires: [
        "1x Product Manager", "2x Full-Stack Developers", "1x Growth Marketing Manager", "1x Customer Support (part-time)"
    ]
  }
};

// --- Reusable Components ---

const SectionWrapper = ({ title, icon: Icon, children }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-4 bg-gray-800 flex items-center gap-4 border-b border-gray-700">
            <Icon className="w-7 h-7 text-teal-400" />
            <h2 className="text-2xl text-white font-bold">{title}</h2>
        </div>
        <div className="p-4 md:p-6">{children}</div>
    </div>
);

const ExpandableCard = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-3 text-left text-white font-semibold">
                <span>{title}</span>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && <div className="p-3 border-t border-gray-700 text-gray-300">{children}</div>}
        </div>
    );
};

// --- UI Mockup Components ---
const RevenueRecoveryUI = () => (
  <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 h-full flex flex-col">
    <h3 className="text-white font-bold mb-2">Panel de Recuperación de Ventas</h3>
    <div className="grid grid-cols-3 gap-2 mb-2">
      <div className="bg-green-500/20 p-2 rounded text-center"><p className="text-xs text-green-300">Recuperado</p><p className="text-lg font-bold text-white">€12,450</p></div>
      <div className="bg-yellow-500/20 p-2 rounded text-center"><p className="text-xs text-yellow-300">En Proceso</p><p className="text-lg font-bold text-white">89</p></div>
      <div className="bg-red-500/20 p-2 rounded text-center"><p className="text-xs text-red-300">Perdido</p><p className="text-lg font-bold text-white">€4,300</p></div>
    </div>
    <div className="flex-grow bg-gray-800 rounded p-2 text-sm">
      <p className="text-white font-semibold mb-1">Oportunidades Activas</p>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded mb-1"><span className="text-gray-300">Cliente #1234 - Carrito</span><button className="bg-teal-500 text-white px-2 py-0.5 text-xs rounded">Contactar</button></div>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded mb-1"><span className="text-gray-300">Cliente #5678 - Stock</span><button className="bg-teal-500 text-white px-2 py-0.5 text-xs rounded">Notificar</button></div>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded"><span className="text-gray-300">Cliente #9012 - ETD</span><span className="text-yellow-400 text-xs">En espera</span></div>
    </div>
  </div>
);

const GlobalShipUI = () => (
  <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 h-full flex flex-col">
    <h3 className="text-white font-bold mb-2">Panel de Logística Global</h3>
    <div className="flex-grow bg-gray-800 rounded p-2 text-sm">
      <p className="text-white font-semibold mb-1">Envíos Pendientes de Documentación</p>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded mb-1"><span className="text-gray-300">Pedido #9876 - USA (Bundle)</span><button className="bg-teal-500 text-white px-2 py-0.5 text-xs rounded">Generar Paperless</button></div>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded mb-1"><span className="text-gray-300">Pedido #9877 - UK</span><button className="bg-teal-500 text-white px-2 py-0.5 text-xs rounded">Generar Paperless</button></div>
      <p className="text-white font-semibold mt-2 mb-1">En Tránsito</p>
      <div className="flex justify-between items-center bg-gray-700 p-1.5 rounded"><span className="text-gray-300">Pedido #9875 - Japón</span><span className="text-sky-400 text-xs">En Aduanas</span></div>
    </div>
  </div>
);

const CatalogIntelUI = () => (
  <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 h-full flex flex-col">
    <h3 className="text-white font-bold mb-2">Panel de Inteligencia de Catálogo</h3>
    <div className="text-center bg-gray-800 p-2 rounded mb-2">
      <p className="text-xs text-gray-400">Puntuación de Calidad General (KyQ)</p>
      <p className="text-2xl font-bold text-green-400">88%</p>
    </div>
    <div className="flex-grow bg-gray-800 rounded p-2 text-sm">
      <p className="text-white font-semibold mb-1">Acciones Recomendadas</p>
      <div className="flex items-center bg-gray-700 p-1.5 rounded mb-1"><AlertTriangle className="w-4 h-4 text-yellow-400 mr-2 shrink-0"/><span className="text-gray-300">SKU #XYZ-01: Faltan 3 imágenes</span></div>
      <div className="flex items-center bg-gray-700 p-1.5 rounded"><RefreshCw className="w-4 h-4 text-sky-400 mr-2 shrink-0"/><span className="text-gray-300">Sincronizar stock de "Proveedor Z"</span></div>
    </div>
  </div>
);

const OpsControlUI = () => (
  <div className="bg-gray-900 p-4 rounded-lg border-2 border-gray-700 h-full flex flex-col">
    <h3 className="text-white font-bold mb-2">Panel de Control de Operaciones</h3>
    <div className="flex-grow bg-gray-800 rounded p-2 text-sm">
      <p className="text-white font-semibold mb-1">Estado de Sistemas</p>
      <div className="flex items-center bg-gray-700 p-1.5 rounded mb-1"><CheckCircle className="w-4 h-4 text-green-400 mr-2 shrink-0"/><span className="text-gray-300">Certificados Web: OK</span></div>
      <div className="flex items-center bg-gray-700 p-1.5 rounded mb-1"><CheckCircle className="w-4 h-4 text-green-400 mr-2 shrink-0"/><span className="text-gray-300">Robot de Precios: OK</span></div>
      <p className="text-white font-semibold mt-2 mb-1">Alertas Recientes</p>
      <div className="flex items-center bg-gray-700 p-1.5 rounded"><Mail className="w-4 h-4 text-sky-400 mr-2 shrink-0"/><span className="text-gray-300">Reporte de Rentabilidad Enviado</span></div>
    </div>
  </div>
);

// --- View Components ---

const ExecutiveSummaryView = () => (
    <SectionWrapper title={planData.executiveSummary.title} icon={planData.executiveSummary.icon}>
        <div className="space-y-4">
            {planData.executiveSummary.points.map(point => (
                <div key={point.title}>
                    <h3 className="font-semibold text-teal-400">{point.title}</h3>
                    <p className="text-gray-300">{point.content}</p>
                </div>
            ))}
        </div>
    </SectionWrapper>
);

const OpportunityView = () => (
    <SectionWrapper title={planData.opportunity.title} icon={planData.opportunity.icon}>
        <h3 className="text-xl font-semibold text-white mb-4">Puntos de Dolor del Mercado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {planData.opportunity.painPoints.map(point => (
                <div key={point.title} className="bg-gray-800 p-4 rounded-lg text-center">
                    <point.icon className={`w-8 h-8 mx-auto mb-2 ${point.color}`} />
                    <h4 className="font-bold text-white">{point.title}</h4>
                    <p className="text-sm text-gray-400">{point.text}</p>
                </div>
            ))}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">Tamaño del Mercado (TAM, SAM, SOM)</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={planData.opportunity.marketSize} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis type="number" stroke="#a0aec0" tickFormatter={(value) => `${value / 1000000}M`} />
                    <YAxis type="category" dataKey="name" stroke="#a0aec0" width={100} />
                    <Tooltip cursor={{fill: 'rgba(74, 85, 104, 0.3)'}} contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} formatter={(value) => value.toLocaleString()} />
                    <Bar dataKey="value" fill="#0d9488" name="Nº de Tiendas" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </SectionWrapper>
);

const ProductView = () => {
    const [selectedModule, setSelectedModule] = useState(planData.product.modules[0]);
    
    const uiMap = {
      "Iguana Revenue Recovery": <RevenueRecoveryUI />,
      "Iguana Global Ship": <GlobalShipUI />,
      "Iguana Catalog Intel": <CatalogIntelUI />,
      "Iguana Ops Control": <OpsControlUI />,
    };

    return (
        <SectionWrapper title={planData.product.title} icon={planData.product.icon}>
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio de Módulos: Un Ecosistema Integrado</h3>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3 flex flex-col gap-2">
                    {planData.product.modules.map(mod => (
                        <button key={mod.name} onClick={() => setSelectedModule(mod)} className={`p-4 rounded-lg text-left transition-all duration-300 border-l-4 ${selectedModule.name === mod.name ? 'bg-teal-500/20 border-teal-400' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'}`}>
                            <p className="font-bold text-white">{mod.name}</p>
                            <p className="text-xs text-gray-400">{mod.user}</p>
                        </button>
                    ))}
                </div>
                <div className="lg:w-2/3">
                    {selectedModule && (
                        <div className="bg-gray-800 p-6 rounded-lg border border-teal-500/50 h-full">
                            <h4 className="text-2xl font-bold text-teal-400 mb-2">{selectedModule.name}</h4>
                            <p className="text-gray-300 mb-4">{selectedModule.description}</p>
                            <div className="h-64 mb-4">
                                {uiMap[selectedModule.name]}
                            </div>
                            <p className="text-sm text-green-400 font-semibold mb-4"><TrendingUp className="inline w-4 h-4 mr-1"/>Impacto de Negocio: {selectedModule.roi}</p>
                            
                            <ExpandableCard title="Ver Funcionalidades Clave">
                                <div className="space-y-3 mt-2">
                                    {selectedModule.features.map(feature => (
                                         <div key={feature.name} className="bg-gray-700/50 p-3 rounded-md">
                                            <p className="font-semibold text-white">{feature.name} <span className="text-xs text-gray-500 font-mono">({feature.code})</span></p>
                                            <p className="text-sm text-gray-400">{feature.description}</p>
                                         </div>
                                    ))}
                                </div>
                            </ExpandableCard>
                        </div>
                    )}
                </div>
            </div>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">Hoja de Ruta de Desarrollo</h3>
            <div className="relative border-l-2 border-gray-700 ml-4">
            {planData.product.roadmap.map((phase, index) => (
                <div key={index} className="mb-10 ml-8">
                    <span className={`absolute -left-4 flex items-center justify-center w-8 h-8 ${phase.color} rounded-full ring-8 ring-gray-900`}>
                        <Route className="w-4 h-4 text-white" />
                    </span>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
                        <h4 className="font-bold text-white">{phase.phase} <span className="text-sm font-normal text-gray-400">({phase.date})</span></h4>
                        <p className="text-sm text-gray-300 mt-1"><strong className="text-white">Foco:</strong> {phase.devFocus}</p>
                    </div>
                </div>
            ))}
            </div>
        </SectionWrapper>
    );
};

const MarketGTMView = () => (
    <SectionWrapper title={planData.marketGTM.title} icon={planData.marketGTM.icon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Perfil de Cliente Ideal (ICP)</h3>
                <div className="bg-gray-800 p-4 rounded-lg space-y-2">
                    {planData.marketGTM.icp.map(item => (
                        <p key={item} className="flex items-center text-gray-300"><CheckCircle className="w-4 h-4 mr-2 text-green-400"/>{item}</p>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Estrategia Go-to-Market</h3>
                <div className="space-y-3">
                    {planData.marketGTM.gtmStrategy.map(item => <ExpandableCard key={item.title} title={item.title} defaultOpen={true}><ul className="list-disc list-inside space-y-1">{item.points.map(p => <li key={p}>{p}</li>)}</ul></ExpandableCard>)}
                </div>
            </div>
        </div>
    </SectionWrapper>
);

const FinancialsView = () => {
    const [arpu, setArpu] = useState(79);
    const [cac, setCac] = useState(350);
    const [churn, setChurn] = useState(3); // Adjusted churn for profitability

    const scenarioData = useMemo(() => {
        const results = [];
        let activeClients = 0;
        let cumulativeCashflow = planData.financials.assumptions.funding.ask;
        const monthlyOpex = (planData.financials.assumptions.initialTeamCost + planData.financials.assumptions.marketingBudget + planData.financials.assumptions.g_a_cost) / 12;
        let monthlyMarketingSpend = planData.financials.assumptions.marketingBudget / 12;

        for (let month = 1; month <= 36; month++) {
            // Acquisition model with slight growth factor
            const marketingEfficiency = 1 + (month - 1) * 0.045; // Increased efficiency
            const newPaidUsers = (monthlyMarketingSpend * marketingEfficiency) / cac;
            const churnedUsers = activeClients * (churn / 100);
            activeClients += newPaidUsers - churnedUsers;
            if (activeClients < 0) activeClients = 0;

            const mrr = activeClients * arpu;
            const revenue = mrr;
            const cogs = revenue * planData.financials.assumptions.cogs_rate;
            const grossProfit = revenue - cogs;
            const netProfit = grossProfit - monthlyOpex;
            cumulativeCashflow += netProfit;

            results.push({
                month,
                mrr: Math.round(mrr),
                revenue: Math.round(revenue),
                cogs: Math.round(cogs),
                grossProfit: Math.round(grossProfit),
                opex: Math.round(monthlyOpex),
                netProfit: Math.round(netProfit),
                activeClients: Math.round(activeClients),
                cumulativeCashflow: Math.round(cumulativeCashflow),
            });
        }
        return results;
    }, [arpu, cac, churn]);

    const breakEvenMonth = scenarioData.find(d => d.netProfit > 0)?.month;
    const finalArr = (scenarioData[35]?.mrr || 0) * 12;

    return (
        <SectionWrapper title={planData.financials.title} icon={planData.financials.icon}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Requerimiento y Uso de Fondos</h3>
                    <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-gray-300">Ronda Seed</p>
                            <p className="text-4xl font-bold text-teal-400">{planData.financials.assumptions.funding.ask.toLocaleString()} €</p>
                            <p className="text-xs text-gray-400">para {planData.financials.assumptions.funding.runway} meses de runway</p>
                        </div>
                        <ResponsiveContainer width="60%" height={150}>
                            <PieChart>
                                <Pie data={planData.financials.useOfFunds} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={60} fill="#8884d8" paddingAngle={5}>
                                    {planData.financials.useOfFunds.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Presupuesto y Supuestos Clave</h3>
                     <div className="bg-gray-800 p-4 rounded-lg space-y-2 text-sm">
                        <p className="flex justify-between text-gray-300"><span>Coste Equipo Anual (Año 1):</span> <span className="font-semibold text-white">{planData.financials.assumptions.initialTeamCost.toLocaleString()} €</span></p>
                        <p className="flex justify-between text-gray-300"><span>Presupuesto Marketing Anual (Año 1):</span> <span className="font-semibold text-white">{planData.financials.assumptions.marketingBudget.toLocaleString()} €</span></p>
                        <p className="flex justify-between text-gray-300"><span>Costes Fijos (G&A) Anual:</span> <span className="font-semibold text-white">{planData.financials.assumptions.g_a_cost.toLocaleString()} €</span></p>
                        <p className="flex justify-between text-gray-300"><span>Tasa de COGS (Comisiones + Infra.):</span> <span className="font-semibold text-white">{planData.financials.assumptions.cogs_rate * 100}%</span></p>
                     </div>
                </div>
            </div>
            
            <div className="mt-8">
                 <h3 className="text-xl font-semibold text-white mb-4">Análisis de Escenarios Interactivo</h3>
                 <div className="bg-gray-800 p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Ingreso Medio / Cliente (ARPU)</label>
                        <input type="range" min="40" max="120" value={arpu} onChange={(e) => setArpu(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        <p className="text-center text-teal-400 font-bold text-lg mt-1">{arpu} €</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Coste Adquisición Cliente (CAC)</label>
                        <input type="range" min="150" max="600" value={cac} onChange={(e) => setCac(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        <p className="text-center text-teal-400 font-bold text-lg mt-1">{cac} €</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Tasa de Abandono (Churn)</label>
                        <input type="range" min="1" max="10" step="0.5" value={churn} onChange={(e) => setChurn(Number(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                        <p className="text-center text-teal-400 font-bold text-lg mt-1">{churn.toFixed(1)}%</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
                    <div className="bg-teal-500/20 p-3 rounded-lg border border-teal-500">
                        <p className="text-sm text-white">Punto de Equilibrio</p>
                        <p className="text-2xl font-bold text-white">{breakEvenMonth ? `Mes ${breakEvenMonth}` : "No alcanzado"}</p>
                    </div>
                    <div className="bg-teal-500/20 p-3 rounded-lg border border-teal-500">
                        <p className="text-sm text-white">ARR Año 3</p>
                        <p className="text-2xl font-bold text-white">{finalArr.toLocaleString()} €</p>
                    </div>
                     <div className="bg-teal-500/20 p-3 rounded-lg border border-teal-500">
                        <p className="text-sm text-white">Clientes Activos Año 3</p>
                        <p className="text-2xl font-bold text-white">{scenarioData[35]?.activeClients.toLocaleString()}</p>
                    </div>
                 </div>
            </div>

            <div className="mt-8">
                <ExpandableCard title="Ver Proyecciones P&L Detalladas (36 Meses)">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-2">Mes</th>
                                    <th scope="col" className="px-4 py-2">Clientes</th>
                                    <th scope="col" className="px-4 py-2">MRR</th>
                                    <th scope="col" className="px-4 py-2">Ingresos</th>
                                    <th scope="col" className="px-4 py-2">COGS</th>
                                    <th scope="col" className="px-4 py-2">OPEX</th>
                                    <th scope="col" className="px-4 py-2">Beneficio Neto</th>
                                    <th scope="col" className="px-4 py-2">Flujo de Caja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scenarioData.map(d => (
                                    <tr key={d.month} className="bg-gray-800 border-b border-gray-700">
                                        <td className="px-4 py-2 font-medium text-white">{d.month}</td>
                                        <td className="px-4 py-2">{d.activeClients}</td>
                                        <td className="px-4 py-2">{d.mrr.toLocaleString()} €</td>
                                        <td className="px-4 py-2">{d.revenue.toLocaleString()} €</td>
                                        <td className="px-4 py-2 text-yellow-400">({d.cogs.toLocaleString()} €)</td>
                                        <td className="px-4 py-2 text-yellow-400">({d.opex.toLocaleString()} €)</td>
                                        <td className={`px-4 py-2 font-semibold ${d.netProfit > 0 ? 'text-green-400' : 'text-red-400'}`}>{d.netProfit.toLocaleString()} €</td>
                                        <td className={`px-4 py-2 ${d.cumulativeCashflow < 0 ? 'text-red-400' : 'text-white'}`}>{d.cumulativeCashflow.toLocaleString()} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ExpandableCard>
            </div>
        </SectionWrapper>
    );
};

const TeamView = () => (
    <SectionWrapper title={planData.team.title} icon={planData.team.icon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Liderazgo Fundador</h3>
                <div className="space-y-4">
                    {planData.team.founders.map(founder => (
                        <div key={founder.name} className="bg-gray-800 p-4 rounded-lg">
                            <p className="font-bold text-white">{founder.name}</p>
                            <p className="text-gray-300">{founder.role}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contrataciones Clave (Año 1)</h3>
                <div className="bg-gray-800 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {planData.team.initialHires.map(hire => <li key={hire}>{hire}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    </SectionWrapper>
);


// --- Main App Component ---

const App = () => {
    const [activeView, setActiveView] = useState('Product');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const views = {
        'Summary': <ExecutiveSummaryView />,
        'Opportunity': <OpportunityView />,
        'Product': <ProductView />,
        'Market': <MarketGTMView />,
        'Financials': <FinancialsView />,
        'Team': <TeamView />,
    };

    const navItems = [
        { id: 'Summary', label: 'Resumen Ejecutivo', icon: FileText },
        { id: 'Opportunity', label: 'Oportunidad', icon: Lightbulb },
        { id: 'Product', label: 'Producto y Roadmap', icon: Package },
        { id: 'Market', label: 'Mercado y GTM', icon: Target },
        { id: 'Financials', label: 'Plan Financiero', icon: DollarSign },
        { id: 'Team', label: 'Equipo', icon: Users },
    ];
    
    const ShareModal = () => (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
        <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center border border-teal-500" onClick={e => e.stopPropagation()}>
          <h3 className="text-xl font-bold text-white mb-4">Compartir Plan de Negocio</h3>
          <p className="text-gray-300 mb-6">Esta aplicación interactiva puede ser desplegada como un sitio web privado. Comparte el siguiente enlace seguro con inversores y asesores.</p>
          <div className="bg-gray-900 p-3 rounded-lg flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-teal-400"/>
            <input type="text" readOnly value="https://iguana-tech-plan.v-invest.com/s/a8f5b1e2c3d4" className="bg-transparent text-gray-300 w-full focus:outline-none"/>
          </div>
           <button onClick={() => setIsModalOpen(false)} className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">Entendido</button>
        </div>
      </div>
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans flex">
            {isModalOpen && <ShareModal />}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] z-0"></div>
            <style>{`.bg-grid-gray-700\\/\\[0\\.2\\] { background-image: linear-gradient(to right, rgba(55, 65, 81, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(55, 65, 81, 0.2) 1px, transparent 1px); background-size: 2rem 2rem; }`}</style>
            <aside className="w-20 lg:w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 p-4 flex flex-col z-10 shrink-0">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <svg className="w-8 h-8 text-teal-400" viewBox="0 0 100 100">
                        <path d="M20,80 Q50,95 80,80 L80,50 Q50,65 20,50 Z" fill="currentColor" opacity="0.6"/>
                        <path d="M20,50 Q50,65 80,50 L80,20 Q50,35 20,20 Z" fill="currentColor"/>
                    </svg>
                    <h1 className="text-xl font-bold text-white hidden lg:block">Iguana Tech</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors w-full ${activeView === item.id ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="hidden lg:block">{item.label}</span>
                        </button>
                    ))}
                </nav>
                 <div className="mt-auto">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 p-3 rounded-lg transition-colors w-full text-gray-400 hover:bg-gray-800 hover:text-white mt-4">
                        <Share2 className="w-5 h-5" />
                        <span className="hidden lg:block">Compartir</span>
                    </button>
                  <div className="p-4 bg-gray-800/50 rounded-lg text-center border border-gray-700 mt-4 hidden lg:block">
                    <p className="text-sm text-gray-300">Plan de Negocio</p>
                    <p className="text-xs text-gray-500">© 2025 Iguana Tech</p>
                  </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto z-10">
                <div className="p-4 md:p-6 space-y-6">
                    {views[activeView]}
                </div>
            </main>
        </div>
    );
};

export default App;
