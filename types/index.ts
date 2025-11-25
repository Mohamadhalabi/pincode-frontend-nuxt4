
export type Category = {
  id:number; name:string; behavior:'decoder'|'whatsapp';
  required_inputs: string[]; cost_tokens:number; image_url:string|null;
}
export type Lookup = any
