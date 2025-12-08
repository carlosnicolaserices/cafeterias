import { Type } from 'class-transformer';
import { 
  IsString, 
  IsBoolean, 
  IsNumber, 
  IsArray, 
  ValidateNested, 
  IsOptional, 
  IsUrl, 
  Min, 
  Max, 
  Equals,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';

// --- SUB-DTOS (Validaciones para objetos anidados) ---

class MarcaDto {
  @IsString()
  nombre: string;

  @IsString() 
  @IsOptional()
  url_logo?: string;

  @IsString()
  @IsOptional()
  sitio_web?: string;
}

class DireccionDto {
  @IsString()
  @IsOptional()
  calle?: string;

  @IsString()
  @IsOptional()
  comuna?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  texto_visible?: string;
}

class UbicacionDto {
  @IsString()
  @Equals('Point', { message: 'El tipo de ubicación debe ser "Point"' })
  type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: number[]; // [Longitud, Latitud]

  @ValidateNested()
  @Type(() => DireccionDto)
  @IsOptional()
  direccion?: DireccionDto;
}

class CaracteristicasDto {
  @IsBoolean() @IsOptional() wifi?: boolean;
  @IsBoolean() @IsOptional() admite_mascotas?: boolean;
  @IsBoolean() @IsOptional() opcion_vegana?: boolean;
  @IsBoolean() @IsOptional() enchufes?: boolean;
  @IsBoolean() @IsOptional() terraza?: boolean;
}

class HorarioDto {
  @IsNumber()
  @Min(0)
  @Max(6)
  dia: number; // 0 = Domingo

  @IsString()
  apertura: string; // Ej: "09:00"

  @IsString()
  cierre: string;   // Ej: "20:00"
}

class ValoracionDto {
  @IsNumber()
  @IsOptional()
  promedio?: number;

  @IsNumber()
  @IsOptional()
  cantidad_votos?: number;
}

class ContactoDto {
  @IsString() @IsOptional() telefono?: string;
  @IsString() @IsOptional() instagram?: string;
}

// --- DTO PRINCIPAL ---

export class CreateCoffeeShopDto {
  @IsString()
  nombre: string;

  @IsString()
  slug: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @ValidateNested()
  @Type(() => MarcaDto)
  marca: MarcaDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imagenes?: string[];

  @ValidateNested()
  @Type(() => ValoracionDto)
  @IsOptional()
  valoracion?: ValoracionDto;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  nivel_precio?: number;

  @ValidateNested()
  @Type(() => UbicacionDto)
  ubicacion: UbicacionDto;

  @IsArray()
  @IsString({ each: true })
  categorias: string[];

  @ValidateNested()
  @Type(() => CaracteristicasDto)
  @IsOptional()
  caracteristicas?: CaracteristicasDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioDto)
  @IsOptional()
  horario_atencion?: HorarioDto[];

  @ValidateNested()
  @Type(() => ContactoDto)
  @IsOptional()
  contacto?: ContactoDto;
}