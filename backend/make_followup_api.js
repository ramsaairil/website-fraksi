const fs = require('fs');
const path = require('path');

const api = 'followup';
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

const schema = {
  kind: "collectionType",
  collectionName: "followups",
  info: { singularName: "followup", pluralName: "followups", displayName: "Aspiration Follow-up", description: "Follow-up status on citizen aspirations" },
  options: { draftAndPublish: true },
  pluginOptions: {},
  attributes: {
    title: { type: "string", required: true },
    description: { type: "text", required: true },
    date: { type: "date" },
    status: { type: "enumeration", enum: ["pending", "progress", "done"], required: true, default: "pending" },
    statusText: { type: "string" }
  }
};
fs.writeFileSync(path.join(base, 'content-types', api, 'schema.json'), JSON.stringify(schema, null, 2));

console.log("Created Strapi API for followup");
