import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CafeteriaDocument = HydratedDocument<Cafeteria>;

// --- SUB-ESQUEMAS (Objetos Anidados) ---

@Schema({ _id: false })
class Marca {
  @Prop() nombre: string;
  @Prop() url_logo: string;
  @Prop() sitio_web: string;
}

@Schema({ _id: false })
class Direccion {
  @Prop() pais: string;
  @Prop() calle: string;
  @Prop() comuna: string;
  @Prop() region: string;
  @Prop() sector: string;
  @Prop() provincia: string;
  @Prop() movil: string;
}

@Schema({ _id: false })
class Ubicacion {
  @Prop({ required: true, enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ required: true, type: [Number] }) // [Longitud, Latitud]
  coordinates: number[];

  @Prop({ type: Direccion })
  direccion: Direccion;
}

@Schema({ _id: false })
class Valoracion {
  @Prop() promedio: number;
  @Prop() cantidad_votos: number;
}

// --- SUB-ESQUEMAS DE BOOLEANOS (Flags) ---

@Schema({ _id: false })
class CategoriasNegocios {
  @Prop() tostaduria: boolean;
  @Prop() pasteleria: boolean;
  @Prop() chocolateria: boolean;
  @Prop() panaderia: boolean;
  @Prop() heladeria: boolean;
  @Prop() restaurant: boolean;
  @Prop() bar: boolean;
  @Prop() cafeteria: boolean;
}

@Schema({ _id: false })
class Infraestructura {
  @Prop() wifi: boolean;
  @Prop() terraza: boolean;
  @Prop() calefaccion: boolean;
  @Prop() enchufes: boolean;
  @Prop() estacionamiento: boolean;
  @Prop() zona_fumadores: boolean;
  @Prop() aire_acondicionado: boolean;
  @Prop() ascensor: boolean;
  @Prop() zona_niños: boolean;
  @Prop() juegos_mesa: boolean;
  @Prop() espacio_cowork: boolean;
  @Prop() zona_mascotas: boolean;
}

@Schema({ _id: false })
class Servicios {
  @Prop() musica_en_vivo: boolean;
  @Prop() bingo: boolean;
  @Prop() reservas: boolean;
  @Prop() programa_fidelidad: boolean;
  @Prop() expo_arte: boolean;
  @Prop() invernadero: boolean;
  @Prop() suscripcion_cafe: boolean;
  @Prop() tienda_de_regalos: boolean;
  @Prop() clases_barismo: boolean;
  @Prop() catering: boolean;
  @Prop() catas_cafe: boolean;
  @Prop() drive_thru: boolean;
  @Prop() intercambio_libros: boolean;
  @Prop() delivery: boolean;
  @Prop() take_away: boolean;
  @Prop() reserva_local: boolean;
}

@Schema({ _id: false })
class CaracteristicasAlimenticias {
  @Prop() opcion_vegana: boolean;
  @Prop() opcion_veganista: boolean;
  @Prop() opcion_vegetariano: boolean;
  @Prop() opcion_keto: boolean;
  @Prop() opcion_baja_en_calorias: boolean;
  @Prop() opcion_descafeinado: boolean;
  @Prop() opcion_organico: boolean;
  @Prop() opcion_sin_azucar: boolean;
  @Prop() opcion_sin_lactosa: boolean;
  @Prop() opcion_gluten_free: boolean;
}

@Schema({ _id: false })
class CategoriasSostenibilidad {
  @Prop() comercio_justo: boolean;
  @Prop() cafe_de_especialidad: boolean;
  @Prop() productos_locales: boolean;
  @Prop() envases_biodegradables: boolean;
  @Prop() sostenibilidad: boolean;
  @Prop() kosher: boolean;
  @Prop() halal: boolean;
}

// --- SUB-ESQUEMAS DE ARRAYS COMPLEJOS ---

@Schema({ _id: false })
class Evento {
  @Prop() nombre: string;
  @Prop() fecha: string; // Podrías usar Date si prefieres
  @Prop() hora: string;
  @Prop() duracion: string;
  @Prop() descripcion: string;
  @Prop() foto: string;
}

@Schema({ _id: false })
class Anuncio {
  @Prop() titulo: string;
  @Prop() fecha: string;
  @Prop() hora: string;
  @Prop() duracion: string;
  @Prop() descripcion: string;
  @Prop() foto: string;
}

@Schema({ _id: false })
class Barista {
  @Prop() nombre: string;
  @Prop() redsocial: string;
  @Prop() foto: string;
  @Prop() descripcion: string;
}

@Schema({ _id: false })
class HorarioDetalle {
  @Prop() dia: string; // "Lunes", "Martes"...
  @Prop() apertura: string;
  @Prop() cierre: string;
}

@Schema({ _id: false })
class RedSocialItem {
  @Prop() nombre: string; // "Instagram"
  @Prop() redsocial: string; // URL
}

@Schema({ _id: false })
class Contacto {
  @Prop() mail: string;
  @Prop() telefono: string;
}

// --- ESQUEMA PRINCIPAL (ROOT) ---

@Schema({ collection: 'cafeterias', timestamps: true })
export class Cafeteria {
  @Prop({ required: true }) nombre: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop({ default: true }) activo: boolean;
  @Prop() descripcion: string;

  @Prop({ type: Marca }) marca: Marca;
  @Prop([String]) imagenes: string[]; // Array de URLs
  @Prop({ type: Valoracion }) valoracion: Valoracion;
  @Prop() nivel_precio: number;

  @Prop({ type: Ubicacion, index: '2dsphere' }) ubicacion: Ubicacion;

  // Objetos de Booleanos
  @Prop({ type: CategoriasNegocios }) categorias_negocios: CategoriasNegocios;
  @Prop({ type: Infraestructura }) infraestructura: Infraestructura;
  @Prop({ type: Servicios }) servicios: Servicios;
  @Prop({ type: CaracteristicasAlimenticias }) caracteristicas: CaracteristicasAlimenticias;
  @Prop({ type: CategoriasSostenibilidad }) categoriasDelNegocio: CategoriasSostenibilidad;

  // Arrays Simples
  @Prop([String]) marcas: string[]; // ["Nescafé", "Juan Valdez"]

  // Arrays de Objetos
  @Prop({ type: [Evento] }) eventos: Evento[];
  @Prop({ type: [Anuncio] }) anuncios: Anuncio[];
  @Prop({ type: [Barista] }) barista: Barista[];
  @Prop({ type: [HorarioDetalle] }) horario_atencion: HorarioDetalle[];
  @Prop({ type: Contacto }) contacto: Contacto;
  @Prop({ type: [RedSocialItem] }) redsocial: RedSocialItem[];
}

export const CafeteriaSchema = SchemaFactory.createForClass(Cafeteria);
CafeteriaSchema.index({ ubicacion: '2dsphere' });