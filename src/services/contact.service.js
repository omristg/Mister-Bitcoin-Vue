'use strict';

import { dbService } from './db.service.js';

const KEY = 'contact';

export const contactService = {
    query,
    getById,
    remove,
    save,
    getEmptyContact
}

async function query() {
    var contacts = await dbService.query(KEY);
    if (!contacts || !contacts.length) {
        contacts = _createDefaultContacts();
        await dbService.insert(KEY, contacts);
    }
    return contacts;
}
async function getById(id) {
    const contact = await dbService.getById(KEY, id)
    if (!contact) throw new Error('Unknown Contact')
    return contact;
}

function remove(id) {
    return dbService.remove(KEY, id)
}

function save(contact) {
    if (contact._id) return dbService.put(KEY, contact)
    else return dbService.post(KEY, contact)
}


function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function _createDefaultContacts() {
    return [
        {
            name: "Saloma Cade",
            email: "scade0@ucsd.edu",
            phone: "+380 (738) 800-0020"
        },
        {
            name: "Breanne Saffen",
            email: "bsaffen1@addtoany.com",
            phone: "+33 (710) 411-7135"
        },
        {
            name: "Randal Abbots",
            email: "rabbots2@washingtonpost.com",
            phone: "+51 (274) 330-7508"
        },
        {
            name: "Jessie Igounet",
            email: "jigounet3@zdnet.com",
            phone: "+30 (815) 937-7857"
        },
        {
            name: "Morgen Gronous",
            email: "mgronous4@wunderground.com",
            phone: "+86 (644) 604-0441"
        },
        {
            name: "Bartholomew Newell",
            email: "bnewell5@taobao.com",
            phone: "+420 (151) 664-7785"
        },
        {
            name: "Bryant Surr",
            email: "bsurr6@google.de",
            phone: "+62 (118) 957-0151"
        },
        {
            name: "Arnold Skupinski",
            email: "askupinski7@studiopress.com",
            phone: "+86 (692) 779-4929"
        },
        {
            name: "Ricky Minget",
            email: "rminget8@spotify.com",
            phone: "+351 (629) 632-1285"
        },
        {
            name: "Nicolle Scrange",
            email: "nscrange9@google.pl",
            phone: "+60 (576) 185-1389"
        },
        {
            name: "Wallie Botha",
            email: "wbothaa@nps.gov",
            phone: "+7 (499) 146-4947"
        },
        {
            name: "Dunc Johanning",
            email: "djohanningb@etsy.com",
            phone: "+225 (417) 944-0450"
        },
        {
            name: "Freeland Beckles",
            email: "fbecklesc@amazon.co.uk",
            phone: "+53 (899) 287-8940"
        },
        {
            name: "Christalle Erangey",
            email: "cerangeyd@chronoengine.com",
            phone: "+46 (745) 640-3535"
        },
        {
            name: "Holmes Albany",
            email: "halbanye@webnode.com",
            phone: "+260 (543) 260-7502"
        },
        {
            name: "Wilone Lawless",
            email: "wlawlessf@pen.io",
            phone: "+55 (591) 361-9365"
        },
        {
            name: "Cristi Lydiard",
            email: "clydiardg@google.com.br",
            phone: "+33 (395) 635-6251"
        },
        {
            name: "Sig Wehner",
            email: "swehnerh@ustream.tv",
            phone: "+55 (463) 579-2177"
        },
        {
            name: "Burton Nash",
            email: "bnashi@ucoz.com",
            phone: "+268 (952) 580-6632"
        },
        {
            name: "Bette-ann Cicetti",
            email: "bcicettij@networkadvertising.org",
            phone: "+86 (510) 266-8913"
        },
        {
            name: "Pavlov Holliar",
            email: "pholliark@google.com",
            phone: "+62 (260) 176-9567"
        },
        {
            name: "Hermina Reed",
            email: "hreedl@stumbleupon.com",
            phone: "+33 (132) 422-0820"
        },
        {
            name: "Cy Orwin",
            email: "corwinm@cam.ac.uk",
            phone: "+46 (341) 478-5496"
        },
        {
            name: "Eadmund Evison",
            email: "eevisonn@comsenz.com",
            phone: "+48 (813) 910-2879"
        },
        {
            name: "Filippo Cafferty",
            email: "fcaffertyo@youtu.be",
            phone: "+232 (915) 117-7329"
        },
        {
            name: "Kriste Lockley",
            email: "klockleyp@hatena.ne.jp",
            phone: "+7 (572) 394-5507"
        },
        {
            name: "Lorrin Leggatt",
            email: "lleggattq@wordpress.com",
            phone: "+355 (709) 122-2747"
        },
        {
            name: "Aline Handlin",
            email: "ahandlinr@marriott.com",
            phone: "+86 (675) 127-5669"
        },
        {
            name: "Rockey Staten",
            email: "rstatens@wiley.com",
            phone: "+57 (639) 702-6378"
        },
        {
            name: "Vaughn Simion",
            email: "vsimiont@europa.eu",
            phone: "+86 (743) 502-4065"
        }
    ]
}
