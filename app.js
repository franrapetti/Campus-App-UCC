// App interactivity and logic

document.addEventListener('DOMContentLoaded', () => {
    // Add logic for active nav highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'font-bold');
            link.classList.add('text-gray-300'); // Reset
            
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.remove('text-gray-300');
                link.classList.add('text-white', 'font-bold');
            }
        });
    });

    // Handle accordion mutually exclusive open state (optional enhancement)
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            detailsElements.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });
    
    // Chat Logic Simulation
    const contacts = document.querySelectorAll('#chat-contacts li');
    const activeName = document.getElementById('chat-active-name');
    const activeStatus = document.getElementById('chat-active-status');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    const chatData = {
        'docente-1': [
            { sender: 'them', text: 'Hola, recuerden que el parcial es el próximo lunes.' },
            { sender: 'me', text: 'Profe, ¿entra la unidad 4?' },
            { sender: 'them', text: 'Sí, entra hasta el final de la unidad 4.' }
        ],
        'companero-1': [
            { sender: 'them', text: 'Che, ¿pasaste los apuntes de física?' },
            { sender: 'me', text: 'Sí, te los pasé ayer al mail.' }
        ],
        'companero-2': [
            { sender: 'me', text: '¿Hacemos grupo para el tp de prog?' },
            { sender: 'them', text: 'Dale de una, agregá a Juan también.' }
        ]
    };

    let currentContactId = 'docente-1';

    function renderMessages(contactId) {
        if (!chatMessages) return;
        chatMessages.innerHTML = '';
        const messages = chatData[contactId] || [];
        messages.forEach(msg => {
            const isMe = msg.sender === 'me';
            const msgDiv = document.createElement('div');
            msgDiv.className = `flex ${isMe ? 'justify-end' : 'justify-start'}`;
            msgDiv.innerHTML = `
                <div class="${isMe ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'} max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm">
                    ${msg.text}
                </div>
            `;
            chatMessages.appendChild(msgDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Initialize chat
    if (chatMessages) {
        renderMessages(currentContactId);
    }

    contacts.forEach(contact => {
        contact.addEventListener('click', () => {
            // Update active state in sidebar
            contacts.forEach(c => {
                c.classList.remove('bg-blue-50', 'border-l-4', 'border-blue-600');
            });
            contact.classList.add('bg-blue-50', 'border-l-4', 'border-blue-600');

            // Update header
            const name = contact.querySelector('p.font-semibold').innerText;
            const status = contact.querySelector('p.text-xs').innerText;
            activeName.innerText = name;
            activeStatus.innerText = status;

            // Load messages
            currentContactId = contact.getAttribute('data-contact');
            renderMessages(currentContactId);
        });
    });

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                // Add to data
                if (!chatData[currentContactId]) chatData[currentContactId] = [];
                chatData[currentContactId].push({ sender: 'me', text });
                
                // Render and clear
                renderMessages(currentContactId);
                chatInput.value = '';

                // Simulate reply after 1.5s
                setTimeout(() => {
                    chatData[currentContactId].push({ sender: 'them', text: 'Entendido.' });
                    renderMessages(currentContactId);
                }, 1500);
            }
        });
    }

    console.log('Campus App MVP initialized successfully.');
});
