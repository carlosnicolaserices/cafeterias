import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoffeeShopDocument = CoffeeShop & Document;

// --- SUB-ESQUEMAS (Para organizar mejor los objetos anidados) ---

@Schema({ _id: false }) // _id: false para no generar IDs internos extra
class Marca {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  url_logo: string;

  @Prop()
  sitio_web: string;
}

@Schema({ _id: false })
class Direccion {
  @Prop() calle: string;
  @Prop() comuna: string;
  @Prop() region: string;
  @Prop() texto_visible: string;
}

@Schema({ _id: false })
class Ubicacion {
  @Prop({ required: true, enum: ['Point'], default: 'Point' })
  type: string; // GeoJSON requiere "Point"

  @Prop({ required: true, type: [Number] }) // [Longitud, Latitud]
  coordinates: number[];

  @Prop({ type: Direccion })
  direccion: Direccion;
}

@Schema({ _id: false })
class Caracteristicas {
  @Prop({ default: false }) wifi: boolean;
  @Prop({ default: false }) admite_mascotas: boolean;
  @Prop({ default: false }) opcion_vegana: boolean;
  @Prop({ default: false }) enchufes: boolean;
  @Prop({ default: false }) terraza: boolean;
}

@Schema({ _id: false })
class Horario {
  @Prop({ required: true }) dia: number; // 1 = Lunes
  @Prop({ required: true }) apertura: string;
  @Prop({ required: true }) cierre: string;
}

@Schema({ _id: false })
class Valoracion {
  @Prop() promedio: number;
  @Prop() cantidad_votos: number;
}

@Schema({ _id: false })
class Contacto {
  @Prop() telefono: string;
  @Prop() instagram: string;
}

// --- ESQUEMA PRINCIPAL ---

@Schema({ timestamps: true }) // Agrega createdAt y updatedAt automático
export class CoffeeShop {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: true })
  activo: boolean;

  @Prop()
  descripcion: string;

  @Prop({ type: Marca, required: true })
  marca: Marca;

  @Prop([String]) // Array de Strings
  imagenes: string[];

  @Prop({ type: Valoracion })
  valoracion: Valoracion;

  @Prop({ min: 1, max: 5 })
  nivel_precio: number;

  // ⚠️ CRÍTICO: Configuración Geoespacial para Mapas
  @Prop({ type: Ubicacion, required: true, index: '2dsphere' }) 
  ubicacion: Ubicacion;

  @Prop([String])
  categorias: string[];

  @Prop({ type: Caracteristicas })
  caracteristicas: Caracteristicas;

  @Prop({ type: [Horario], default: [] })
  horario_atencion: Horario[];

  @Prop({ type: Contacto })
  contacto: Contacto;
}

export const CoffeeShopSchema = SchemaFactory.createForClass(CoffeeShop);

// Índice geoespacial para búsquedas "Cerca de mí"
CoffeeShopSchema.index({ ubicacion: '2dsphere' });