const fs = require('fs');
const path = require('path');

const apis = ['aspiration', 'gallery'];

apis.forEach(api => {
  const base = path.join(__dirname, 'src', 'api', api);
  const dirs = [
    path.join(base, 'content-types', api),
    path.join(base, 'controllers'),
    path.join(base, 'routes'),
    path.join(base, 'services'),
  ];
  
  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

  fs.writeFileSync(path.join(base, 'controllers', `${api}.ts`), `import { factories } from '@strapi/strapi';\nexport default factories.createCoreController('api::${api}.${api}');\n`);
  fs.writeFileSync(path.join(base, 'routes', `${api}.ts`), `import { factories } from '@strapi/strapi';\nexport default factories.createCoreRouter('api::${api}.${api}');\n`);
  fs.writeFileSync(path.join(base, 'services', `${api}.ts`), `import { factories } from '@strapi/strapi';\nexport default factories.createCoreService('api::${api}.${api}');\n`);
});

const aspSchema = {
  kind: "collectionType",
  collectionName: "aspirations",
  info: { singularName: "aspiration", pluralName: "aspirations", displayName: "Aspiration", description: "User submitted aspirations" },
  options: { draftAndPublish: false },
  pluginOptions: {},
  attributes: {
    name: { type: "string", required: true },
    email: { type: "email", required: true },
    subject: { type: "string", required: true },
    message: { type: "text", required: true }
  }
};
fs.writeFileSync(path.join(__dirname, 'src/api/aspiration/content-types/aspiration/schema.json'), JSON.stringify(aspSchema, null, 2));

const galSchema = {
  kind: "collectionType",
  collectionName: "galleries",
  info: { singularName: "gallery", pluralName: "galleries", displayName: "Gallery", description: "Photo and video galleries" },
  options: { draftAndPublish: true },
  pluginOptions: {},
  attributes: {
    title: { type: "string", required: true },
    type: { type: "enumeration", enum: ["foto", "video"], required: true, default: "foto" },
    date: { type: "date" },
    media: { type: "media", multiple: false, required: false, allowedTypes: ["images", "videos"] },
    link_video: { type: "string" }
  }
};
fs.writeFileSync(path.join(__dirname, 'src/api/gallery/content-types/gallery/schema.json'), JSON.stringify(galSchema, null, 2));

console.log("Created Strapi APIs for aspiration and gallery");
