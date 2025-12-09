import { IsString, IsBoolean, IsNumber, IsArray, ValidateNested, IsOptional, IsUrl, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

// DTOs auxiliares para validar objetos anidados

class MarcaDto {
  @IsString() @IsOptional() nombre: string;
  @IsUrl() @IsOptional() url_logo: string;
  @IsUrl() @IsOptional() sitio_web: string;
}

class DireccionDto {
  @IsString() @IsOptional() pais: string;
  @IsString() @IsOptional() calle: string;
  @IsString() @IsOptional() comuna: string;
  @IsString() @IsOptional() region: string;
  @IsString() @IsOptional() sector: string;
  @IsString() @IsOptional() provincia: string;
  @IsUrl() @IsOptional() movil: string;
}

class UbicacionDto {
  @IsString() type: string;
  @IsArray() coordinates: number[];
  @ValidateNested() @Type(() => DireccionDto) direccion: DireccionDto;
}

class ValoracionDto {
  @IsNumber() @IsOptional() promedio: number;
  @IsNumber() @IsOptional() cantidad_votos: number;
}

// Puedes hacer una clase genérica para los booleanos si quieres ahorrar código, 
// pero explícito es mejor para Swagger.
class InfraestructuraDto {
  @IsBoolean() @IsOptional() wifi: boolean;
  @IsBoolean() @IsOptional() terraza: boolean;
  // ... agrega el resto de tus booleanos aquí
}
// (Repite para ServiciosDto, CategoriasNegociosDto, etc... si validas estricto)

class EventoDto {
  @IsString() nombre: string;
  @IsString() fecha: string;
  @IsString() hora: string;
  @IsString() duracion: string;
  @IsString() descripcion: string;
  @IsString() foto: string;
}

class HorarioDto {
  @IsString() dia: string;
  @IsString() apertura: string;
  @IsString() cierre: string;
}

class ContactoDto {
  @IsString() @IsOptional() mail: string;
  @IsString() @IsOptional() telefono: string;
}

class RedSocialDto {
  @IsString() nombre: string;
  @IsString() redsocial: string;
}

// DTO PRINCIPAL

export class CreateCoffeeShopDto {
  @IsString() nombre: string;
  @IsString() slug: string;
  @IsBoolean() @IsOptional() activo: boolean;
  @IsString() @IsOptional() descripcion: string;

  @ValidateNested() @Type(() => MarcaDto) marca: MarcaDto;
  
  @IsArray() @IsString({ each: true }) imagenes: string[];
  
  @ValidateNested() @Type(() => ValoracionDto) @IsOptional() valoracion: ValoracionDto;
  
  @IsNumber() @IsOptional() nivel_precio: number;
  
  @ValidateNested() @Type(() => UbicacionDto) ubicacion: UbicacionDto;

  // Si decides validar los objetos grandes de booleanos, crea sus clases DTO arriba
  // Por brevedad, aquí uso IsOptional + Object, pero idealmente usa ValidateNested
  @IsOptional() categorias_negocios: Record<string, boolean>;
  @IsOptional() infraestructura: Record<string, boolean>;
  @IsOptional() servicios: Record<string, boolean>;
  @IsOptional() caracteristicas: Record<string, boolean>;
  @IsOptional() categoriasDelNegocio: Record<string, boolean>;

  @IsArray() @IsString({ each: true }) marcas: string[];

  @IsArray() @ValidateNested({ each: true }) @Type(() => EventoDto) @IsOptional() eventos: EventoDto[];
  
  // Reutilizo EventoDto para anuncios ya que tienen la misma estructura en tu JSON
  @IsArray() @ValidateNested({ each: true }) @Type(() => EventoDto) @IsOptional() anuncios: EventoDto[]; 
  
  // Para baristas crea BaristaDto si difiere mucho
  @IsArray() @IsOptional() barista: any[]; 

  @IsArray() @ValidateNested({ each: true }) @Type(() => HorarioDto) @IsOptional() horario_atencion: HorarioDto[];
  
  @ValidateNested() @Type(() => ContactoDto) @IsOptional() contacto: ContactoDto;
  
  @IsArray() @ValidateNested({ each: true }) @Type(() => RedSocialDto) @IsOptional() redsocial: RedSocialDto[];
}