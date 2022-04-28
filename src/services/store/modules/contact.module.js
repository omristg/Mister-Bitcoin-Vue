import { contactService } from "../../contact.service";

export default {
    state: {
        contacts: null
    },
    getters: {
        contacts(state) {
            return state.contacts
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { id }) {
            const idx = state.contacts.findIndex(contact => contact._id === id)
            state.contacts.splice(idx, 1)

        },
        saveContact(state, { savedContact }) {
            const idx = state.contacts.findIndex(contact => contact._id === savedContact._id)
            if (idx === -1) state.contacts.push(savedContact)
            else state.contacts.splice(idx, 1, savedContact)
        }
    },
    actions: {
        async loadContacts(context) {
            const contacts = await contactService.query()
            context.commit({ type: 'setContacts', contacts })
        },
        async removeContact({ commit }, { id }) {
            await contactService.remove(id)
            commit({ type: 'removeContact', id })
        },
        async saveContact({ commit }, { contact }) {
            const savedContact = await contactService.save(contact)
            commit({ type: 'saveContact', savedContact })
        }
    },

}