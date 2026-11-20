import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai'
import { app } from './firebase'

const ia = getAI(app, { backend: new GoogleAIBackend() })
// timeout: si Gemini no responde en 30 segundos se cancela el pedido
const model = getGenerativeModel(ia, { model: 'gemini-3.7-flash' }, { timeout: 30000 })

export async function recomendar(pedido, personajes) {
  // Mandamos solo los datos necesarios de los personajes que ya cargó la app
  const lista = personajes.map((p) => ({ name: p.name, status: p.status, species: p.species }))
  const prompt =
    'Sos un recomendador dentro de una página web de Rick and Morty. ' +
    'Respondé en texto plano, en español y con menos de 80 palabras. ' +
    'Recomendá solamente personajes de esta lista, no inventes otros: ' +
    JSON.stringify(lista) +
    '. Pedido del usuario: ' +
    pedido
  const respuesta = await model.generateContent(prompt)
  return respuesta.response.text()
}
