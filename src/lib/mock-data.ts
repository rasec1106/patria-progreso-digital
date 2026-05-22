export type Dimension = {
  key: string;
  label: string;
  short: string;
  icon: string;
  description: string;
};

export const DIMENSIONS: Dimension[] = [
  { key: "proposito", label: "Propósito personal y ciudadanía", short: "Propósito", icon: "Compass",
    description: "Claridad sobre tu rol como ciudadano y el aporte que quieres dejar en tu comunidad." },
  { key: "democracia", label: "Democracia y sistema político", short: "Democracia", icon: "Landmark",
    description: "Comprensión de las instituciones, el voto y los mecanismos de participación democrática." },
  { key: "estado", label: "Estado peruano y función pública", short: "Estado", icon: "Building2",
    description: "Cómo opera el Estado, la carrera pública y la gestión transparente de recursos." },
  { key: "economia", label: "Economía y desarrollo", short: "Economía", icon: "TrendingUp",
    description: "Conceptos económicos clave para leer al país y proponer desarrollo sostenible." },
  { key: "dialogo", label: "Escucha, diálogo y consenso", short: "Diálogo", icon: "MessagesSquare",
    description: "Habilidad para escuchar al otro, construir acuerdos y procesar la diferencia." },
  { key: "activismo", label: "Activismo y vigilancia ciudadana", short: "Activismo", icon: "ShieldCheck",
    description: "Herramientas para fiscalizar, denunciar y movilizar de forma ética y efectiva." },
];

export const SOFT_SKILLS = [
  "Liderazgo", "Comunicación", "Trabajo en equipo", "Resolución de conflictos", "Pensamiento crítico",
];

export type Becario = {
  id: string;
  nombre: string;
  edad: number;
  region: string;
  ocupacion: string;
  edicion: number;
  semana: number;
  avatar: string;
  estado: "activo" | "riesgo" | "graduado";
  progreso: number;
  ultimaActividad: string;
  entrada: Record<string, number>;
  actual: Record<string, number>;
  motivacion: string;
  alertaRazon?: string;
};

const dim = (p: number, d: number, e: number, ec: number, di: number, a: number) =>
  ({ proposito: p, democracia: d, estado: e, economia: ec, dialogo: di, activismo: a });

export const DIEGO: Becario = {
  id: "diego",
  nombre: "Diego Quispe Tuanama",
  edad: 22,
  region: "San Martín",
  ocupacion: "Estudiante de Ciencia Política — USAT",
  edicion: 4,
  semana: 12,
  avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Diego%20Quispe&backgroundColor=C8102E&textColor=ffffff",
  estado: "activo",
  progreso: 46,
  ultimaActividad: "Hace 2 días",
  entrada: dim(2.8, 2.4, 2.1, 2.0, 2.5, 2.6),
  actual: dim(3.9, 3.6, 3.2, 3.0, 4.3, 3.8),
  motivacion: "Quiero que mi región tenga voz en Lima. En Tarapoto vemos cómo las decisiones se toman lejos y a nosotros nos toca aguantar.",
};

export const BECARIOS: Becario[] = [
  DIEGO,
  { id: "rosa", nombre: "Rosa Mamani Choque", edad: 24, region: "Puno", ocupacion: "Comunicadora social", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Rosa%20Mamani&backgroundColor=2E8540&textColor=ffffff", estado: "activo", progreso: 58, ultimaActividad: "Hoy", entrada: dim(3.0,2.7,2.5,2.3,3.1,3.0), actual: dim(4.1,3.8,3.6,3.4,4.4,4.0), motivacion: "El aymara también construye país." },
  { id: "kevin", nombre: "Kevin Sánchez Reátegui", edad: 21, region: "Loreto", ocupacion: "Estudiante de Derecho", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Kevin%20Sanchez&backgroundColor=D4AF37&textColor=1A1A1A", estado: "riesgo", progreso: 28, ultimaActividad: "Hace 23 días", entrada: dim(2.5,2.2,2.0,1.9,2.6,2.4), actual: dim(2.7,2.3,2.1,2.0,2.6,2.5), motivacion: "Quiero defender el río Amazonas con argumentos.", alertaRazon: "Sin actividad en 3 semanas" },
  { id: "milagros", nombre: "Milagros Huamán Cárdenas", edad: 26, region: "Cusco", ocupacion: "Docente rural", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Milagros%20Huaman&backgroundColor=C8102E&textColor=ffffff", estado: "activo", progreso: 71, ultimaActividad: "Ayer", entrada: dim(3.2,2.9,2.7,2.4,3.4,3.1), actual: dim(4.3,4.0,3.8,3.5,4.6,4.2), motivacion: "Mis estudiantes merecen un país que los escuche." },
  { id: "alonso", nombre: "Alonso Chambi Apaza", edad: 23, region: "Apurímac", ocupacion: "Líder comunitario", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Alonso%20Chambi&backgroundColor=2E8540&textColor=ffffff", estado: "activo", progreso: 52, ultimaActividad: "Hace 4 días", entrada: dim(2.9,2.5,2.3,2.2,2.8,3.0), actual: dim(3.8,3.4,3.1,2.9,3.9,4.0), motivacion: "Quiero traer servicios reales a Andahuaylas." },
  { id: "valeria", nombre: "Valeria Ríos Espinoza", edad: 20, region: "Lima", ocupacion: "Estudiante de Economía", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Valeria%20Rios&backgroundColor=E08E00&textColor=1A1A1A", estado: "activo", progreso: 64, ultimaActividad: "Hoy", entrada: dim(3.1,3.0,2.8,3.2,3.0,2.9), actual: dim(4.0,4.1,3.9,4.3,4.1,3.8), motivacion: "La economía bien explicada cambia votos." },
  { id: "sebastian", nombre: "Sebastián Pacheco Vargas", edad: 25, region: "Arequipa", ocupacion: "Ingeniero civil", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sebastian%20Pacheco&backgroundColor=D4AF37&textColor=1A1A1A", estado: "activo", progreso: 60, ultimaActividad: "Hace 1 día", entrada: dim(2.7,2.6,2.5,2.8,2.7,2.5), actual: dim(3.7,3.6,3.5,3.8,3.9,3.6), motivacion: "Quiero infraestructura que sirva a la gente, no a los favores." },
  { id: "yajaira", nombre: "Yajaira Castillo Farfán", edad: 22, region: "Piura", ocupacion: "Estudiante de Ciencias Políticas", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Yajaira%20Castillo&backgroundColor=C8102E&textColor=ffffff", estado: "riesgo", progreso: 33, ultimaActividad: "Hace 12 días", entrada: dim(2.4,2.3,2.1,2.0,2.5,2.4), actual: dim(2.8,2.6,2.4,2.2,2.9,2.7), motivacion: "Piura merece dejar de ser noticia solo por desastres.", alertaRazon: "Bajó autoevaluación en Diálogo y Consenso" },
  { id: "luis", nombre: "Luis Saavedra Cerna", edad: 28, region: "Cajamarca", ocupacion: "Comunicador independiente", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Luis%20Saavedra&backgroundColor=2E8540&textColor=ffffff", estado: "activo", progreso: 68, ultimaActividad: "Hoy", entrada: dim(3.3,3.0,2.9,2.7,3.2,3.4), actual: dim(4.2,3.9,3.8,3.5,4.3,4.4), motivacion: "El periodismo en provincia se hace con uñas y verdad." },
  { id: "fiorella", nombre: "Fiorella Quintanilla Béjar", edad: 24, region: "Junín", ocupacion: "Trabajadora social", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Fiorella%20Quintanilla&backgroundColor=E08E00&textColor=1A1A1A", estado: "activo", progreso: 55, ultimaActividad: "Hace 3 días", entrada: dim(2.8,2.6,2.5,2.4,2.9,2.7), actual: dim(3.8,3.5,3.4,3.2,4.0,3.7), motivacion: "Huancayo necesita ciudadanos que no se rindan." },
  { id: "joaquin", nombre: "Joaquín Flores Ticona", edad: 23, region: "Moquegua", ocupacion: "Egresado de Sociología", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Joaquin%20Flores&backgroundColor=D4AF37&textColor=1A1A1A", estado: "activo", progreso: 50, ultimaActividad: "Hace 5 días", entrada: dim(2.6,2.5,2.4,2.3,2.7,2.6), actual: dim(3.5,3.4,3.3,3.2,3.7,3.5), motivacion: "Quiero entender bien el canon antes de criticarlo." },
  { id: "andrea", nombre: "Andrea Sifuentes León", edad: 21, region: "La Libertad", ocupacion: "Estudiante de Educación", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Andrea%20Sifuentes&backgroundColor=2E8540&textColor=ffffff", estado: "activo", progreso: 62, ultimaActividad: "Ayer", entrada: dim(2.9,2.8,2.6,2.5,3.0,2.9), actual: dim(4.0,3.8,3.6,3.4,4.1,3.9), motivacion: "Educar es el primer acto político." },
  { id: "ruben", nombre: "Rubén Ccahuana Ñahui", edad: 27, region: "Ayacucho", ocupacion: "Funcionario regional junior", edicion: 4, semana: 12, avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Ruben%20Ccahuana&backgroundColor=C8102E&textColor=ffffff", estado: "riesgo", progreso: 35, ultimaActividad: "Hace 18 días", entrada: dim(3.0,2.7,2.8,2.6,2.9,3.0), actual: dim(3.1,2.8,2.9,2.6,2.9,3.0), motivacion: "Ayacucho cargó mucho. Quiero aportar desde adentro.", alertaRazon: "No completó la última sesión" },
];

export type Mentor = {
  id: string; nombre: string; rol: string; bio: string; avatar: string;
};
export const MENTORS: Mentor[] = [
  { id: "madison", nombre: "Madison Montenegro", rol: "Project Manager", bio: "Lidera la operación de Patria C. 6 años acompañando jóvenes líderes desde regiones.", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Madison%20Montenegro&backgroundColor=C8102E&textColor=ffffff" },
  { id: "victor", nombre: "Victor Terrones", rol: "Analista de programas", bio: "Politólogo. Diseña el currículo de las 26 sesiones y los bootcamps regionales.", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Victor%20Terrones&backgroundColor=2E8540&textColor=ffffff" },
  { id: "andrea", nombre: "Andrea Rengifo", rol: "Comunicaciones", bio: "Comunicadora amazónica. Ayuda a los becarios a contar bien lo que están construyendo.", avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Andrea%20Rengifo&backgroundColor=D4AF37&textColor=1A1A1A" },
];

export type Feedback = {
  id: string; mentorId: string; fecha: string; dimension?: string; texto: string;
};
export const FEEDBACK_DIEGO: Feedback[] = [
  { id: "f1", mentorId: "madison", fecha: "12 abr", dimension: "activismo", texto: "Tu intervención en la sesión sobre vigilancia ciudadana mostró un nivel de análisis crítico muy maduro. Sigue así." },
  { id: "f2", mentorId: "victor", fecha: "5 abr", dimension: "proposito", texto: "Vi tu propuesta de proyecto comunitario en Tarapoto. Tiene mucho potencial — agendemos 15 minutos para conversarla." },
  { id: "f3", mentorId: "andrea", fecha: "28 mar", dimension: "dialogo", texto: "Tu manera de moderar el grupo en el bootcamp regional fue clave. Bajaste la temperatura sin quitar profundidad." },
  { id: "f4", mentorId: "madison", fecha: "20 mar", dimension: "democracia", texto: "Anímate a leer el caso Madre de Dios que te compartí. Encaja con lo que estás trabajando." },
];

export type Sesion = {
  numero: number; titulo: string; fecha: string; hora: string;
  modalidad: "Presencial" | "Virtual"; bloque: string;
  estado: "completada" | "pendiente";
};
// Las 26 sesiones del programa, en orden. Las 12 primeras están completadas
// ("Vas en la 12"); el resto están por completar y se agrupan por bloque.
export const SESIONES: Sesion[] = [
  { numero: 1, titulo: "Bienvenida: ¿qué significa ser ciudadano hoy?", fecha: "20 ene", hora: "19:00", modalidad: "Virtual", bloque: "Propósito", estado: "completada" },
  { numero: 2, titulo: "Mi historia, mi región, mi voz", fecha: "27 ene", hora: "19:00", modalidad: "Virtual", bloque: "Propósito", estado: "completada" },
  { numero: 3, titulo: "Valores republicanos y ética pública", fecha: "3 feb", hora: "19:00", modalidad: "Virtual", bloque: "Propósito", estado: "completada" },
  { numero: 4, titulo: "La Constitución como pacto vivo", fecha: "10 feb", hora: "19:00", modalidad: "Virtual", bloque: "Democracia", estado: "completada" },
  { numero: 5, titulo: "Partidos, elecciones y representación", fecha: "17 feb", hora: "19:00", modalidad: "Virtual", bloque: "Democracia", estado: "completada" },
  { numero: 6, titulo: "Separación de poderes y contrapesos", fecha: "24 feb", hora: "19:00", modalidad: "Virtual", bloque: "Democracia", estado: "completada" },
  { numero: 7, titulo: "Descentralización y gobiernos regionales", fecha: "3 mar", hora: "19:00", modalidad: "Virtual", bloque: "Democracia", estado: "completada" },
  { numero: 8, titulo: "Bootcamp Lima: instituciones por dentro", fecha: "10 mar", hora: "09:00", modalidad: "Presencial", bloque: "Estado", estado: "completada" },
  { numero: 9, titulo: "Función pública y carrera meritocrática", fecha: "17 mar", hora: "19:00", modalidad: "Virtual", bloque: "Estado", estado: "completada" },
  { numero: 10, titulo: "Servicios públicos y ciudadanía", fecha: "24 mar", hora: "19:00", modalidad: "Virtual", bloque: "Estado", estado: "completada" },
  { numero: 11, titulo: "Transparencia y acceso a la información", fecha: "31 mar", hora: "19:00", modalidad: "Virtual", bloque: "Estado", estado: "completada" },
  { numero: 12, titulo: "Presupuesto público explicado", fecha: "7 abr", hora: "19:00", modalidad: "Virtual", bloque: "Economía", estado: "completada" },
  { numero: 13, titulo: "Modelo económico peruano: virtudes y deudas", fecha: "14 abr", hora: "19:00", modalidad: "Virtual", bloque: "Economía", estado: "pendiente" },
  { numero: 14, titulo: "Informalidad y desarrollo productivo", fecha: "21 abr", hora: "19:00", modalidad: "Virtual", bloque: "Economía", estado: "pendiente" },
  { numero: 15, titulo: "Economía regional y cierre de brechas", fecha: "28 abr", hora: "19:00", modalidad: "Virtual", bloque: "Economía", estado: "pendiente" },
  { numero: 16, titulo: "Escucha activa y conversaciones difíciles", fecha: "5 may", hora: "19:00", modalidad: "Virtual", bloque: "Diálogo", estado: "pendiente" },
  { numero: 17, titulo: "Bootcamp Arequipa: diseñando proyectos de impacto", fecha: "12 may", hora: "09:00", modalidad: "Presencial", bloque: "Diálogo", estado: "pendiente" },
  { numero: 18, titulo: "Construcción de consensos y mediación", fecha: "19 may", hora: "19:00", modalidad: "Virtual", bloque: "Diálogo", estado: "pendiente" },
  { numero: 19, titulo: "Vigilancia ciudadana con datos abiertos", fecha: "26 may", hora: "19:00", modalidad: "Virtual", bloque: "Activismo", estado: "pendiente" },
  { numero: 20, titulo: "Movilización ética y no violencia", fecha: "2 jun", hora: "19:00", modalidad: "Virtual", bloque: "Activismo", estado: "pendiente" },
  { numero: 21, titulo: "Periodismo, redes y verdad", fecha: "9 jun", hora: "19:00", modalidad: "Virtual", bloque: "Activismo", estado: "pendiente" },
  { numero: 22, titulo: "Bootcamp San Martín: ciudadanía amazónica", fecha: "16 jun", hora: "08:30", modalidad: "Presencial", bloque: "Activismo", estado: "pendiente" },
  { numero: 23, titulo: "Diseño de proyecto final", fecha: "23 jun", hora: "19:00", modalidad: "Virtual", bloque: "Liderazgo", estado: "pendiente" },
  { numero: 24, titulo: "Liderazgo público y vocería", fecha: "30 jun", hora: "19:00", modalidad: "Virtual", bloque: "Liderazgo", estado: "pendiente" },
  { numero: 25, titulo: "Mentoría y sostenibilidad del proyecto", fecha: "7 jul", hora: "19:00", modalidad: "Virtual", bloque: "Liderazgo", estado: "pendiente" },
  { numero: 26, titulo: "Demo Day: presenta tu proyecto", fecha: "14 jul", hora: "09:00", modalidad: "Presencial", bloque: "Liderazgo", estado: "pendiente" },
];

/** Las próximas sesiones por completar, para seguimiento rápido. */
export const PROXIMAS_SESIONES = SESIONES.filter((s) => s.estado === "pendiente").slice(0, 5);

/** Objetivo de cada bloque del programa, indexado por su nombre. */
export const BLOQUES: Record<string, string> = {
  "Propósito": "Definir tu rol como ciudadano y el aporte que quieres dejar en tu comunidad.",
  "Democracia": "Entender las instituciones, el voto y los mecanismos de participación democrática.",
  "Estado": "Conocer cómo opera el Estado, la carrera pública y la gestión transparente de recursos.",
  "Economía": "Manejar los conceptos económicos clave para leer al país y proponer desarrollo sostenible.",
  "Diálogo": "Aprender a escuchar al otro, construir acuerdos y procesar la diferencia.",
  "Activismo": "Adquirir herramientas para fiscalizar, denunciar y movilizar de forma ética y efectiva.",
  "Liderazgo": "Liderar tu proyecto de impacto, comunicarlo con claridad y sostenerlo en el tiempo.",
};

/** Devuelve el objetivo de un bloque, o undefined si no está registrado. */
export function bloqueObjetivo(bloque: string): string | undefined {
  return BLOQUES[bloque];
}

export const ALIADOS = ["Delosi", "BCP", "Scotiabank", "Ferreycorp"];

export const REGIONES = [
  "Amazonas","Áncash","Apurímac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco","Huancavelica",
  "Huánuco","Ica","Junín","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua",
  "Pasco","Piura","Puno","San Martín","Tacna","Tumbes","Ucayali",
];

export const ALUMNI = [
  { id: "a1", nombre: "Camila Rojas Soto", region: "Tacna", edicion: 2, area: "Gestión pública", proyecto: "Veeduría municipal de obras", ods: ["ODS 16"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Camila%20Rojas&backgroundColor=2E8540&textColor=ffffff" },
  { id: "a2", nombre: "Marco Ipanaqué Vidal", region: "Tumbes", edicion: 1, area: "Periodismo", proyecto: "Pódcast 'Frontera'", ods: ["ODS 16","ODS 10"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Marco%20Ipanaque&backgroundColor=C8102E&textColor=ffffff" },
  { id: "a3", nombre: "Greta Quispe Mendoza", region: "Huancavelica", edicion: 3, area: "Educación", proyecto: "Aula viajera de civismo", ods: ["ODS 4"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Greta%20Quispe&backgroundColor=D4AF37&textColor=1A1A1A" },
  { id: "a4", nombre: "Iván Flores Tang", region: "Lima", edicion: 2, area: "Tecnología cívica", proyecto: "Plataforma 'Mi gasto público'", ods: ["ODS 16","ODS 9"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Ivan%20Flores&backgroundColor=2E8540&textColor=ffffff" },
  { id: "a5", nombre: "Sofía Ataucusi Yupanqui", region: "Cusco", edicion: 3, area: "Salud comunitaria", proyecto: "Brigadas de salud rural", ods: ["ODS 3","ODS 10"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Sofia%20Ataucusi&backgroundColor=E08E00&textColor=1A1A1A" },
  { id: "a6", nombre: "Bruno Cárdenas Polo", region: "Ucayali", edicion: 1, area: "Medio ambiente", proyecto: "Red de monitoreo de deforestación", ods: ["ODS 13","ODS 15"], avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Bruno%20Cardenas&backgroundColor=C8102E&textColor=ffffff" },
];

// Objetivos de Desarrollo Sostenible (ONU, Agenda 2030)
export const ODS_NOMBRES: Record<string, string> = {
  "ODS 1": "Fin de la pobreza",
  "ODS 2": "Hambre cero",
  "ODS 3": "Salud y bienestar",
  "ODS 4": "Educación de calidad",
  "ODS 5": "Igualdad de género",
  "ODS 6": "Agua limpia y saneamiento",
  "ODS 7": "Energía asequible y no contaminante",
  "ODS 8": "Trabajo decente y crecimiento económico",
  "ODS 9": "Industria, innovación e infraestructura",
  "ODS 10": "Reducción de las desigualdades",
  "ODS 11": "Ciudades y comunidades sostenibles",
  "ODS 12": "Producción y consumo responsables",
  "ODS 13": "Acción por el clima",
  "ODS 14": "Vida submarina",
  "ODS 15": "Vida de ecosistemas terrestres",
  "ODS 16": "Paz, justicia e instituciones sólidas",
  "ODS 17": "Alianzas para lograr los objetivos",
};

/** Devuelve el ODS con su nombre completo, p. ej. "ODS 16 · Paz, justicia e instituciones sólidas". */
export function odsLabel(ods: string): string {
  const nombre = ODS_NOMBRES[ods];
  return nombre ? `${ods} · ${nombre}` : ods;
}
