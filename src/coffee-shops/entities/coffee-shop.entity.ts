import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CoffeeShopDocument = CoffeeShop & Document;

@Schema({ timestamps: true }) // Crea automáticamente createdAt y updatedAt
export class CoffeeShop {
    @Prop({ required: true, index: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ type: Object })
    brand: {
        name: string;
        logo_url: string;
        website: string;
    };

    // ÍNDICE GEOESPACIAL CRÍTICO
    @Prop({
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }, // [Lng, Lat]
    })
    location: {
        type: string;
        coordinates: number[];
        address?: Record<string, any>;
    };

    @Prop([String])
    categories: string[];

    @Prop([String])
    tags: string[];

    @Prop({ type: Object })
    contact: Record<string, any>;

    @Prop({ type: Object })
    schedule: Record<string, any>;

    @Prop({ default: true })
    active: boolean;
}

export const CoffeeShopSchema = SchemaFactory.createForClass(CoffeeShop);

// Importante: Crear índice para búsquedas geográficas rápidas
CoffeeShopSchema.index({ location: '2dsphere' });