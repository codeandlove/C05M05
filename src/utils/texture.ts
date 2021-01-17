import {TextureLoader} from "three";

export const loadTexture:any = (mapUrl:string, bumpUrl?:string, dispUrl?:string) => {
  const loader = new TextureLoader();
  return [
    loader.load(mapUrl),
    bumpUrl && loader.load(bumpUrl),
    dispUrl && loader.load(dispUrl)
  ];
}

export const loadLensTexture:any = (
  tex0:string,
  tex1?:string,
  tex2?:string,
  tex3?:string,
  tex4?:string,
  tex5?:string,
  tex6?:string
) => {
  const loader = new TextureLoader();
  return [
    loader.load(tex0),
    tex1 && loader.load(tex1),
    tex2 && loader.load(tex2),
    tex3 && loader.load(tex3),
    tex4 && loader.load(tex4),
    tex5 && loader.load(tex5),
    tex6 && loader.load(tex6)
  ];
}

export const loadShaderTexture:any = (texture1:string, texture2?:string, texture3?:string) => {
  const loader = new TextureLoader();
  return [
    loader.load(texture1),
    texture2 && loader.load(texture2),
    texture3 && loader.load(texture3)
  ];
}
