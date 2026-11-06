/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const contactForm = document.querySelector('#contactForm');
    const submitButton = document.querySelector('#submitButton');
    const submitSuccessMessage = document.querySelector('#submitSuccessMessage');
    const submitErrorMessage = document.querySelector('#submitErrorMessage');

    if (
        contactForm instanceof HTMLFormElement &&
        submitButton instanceof HTMLButtonElement &&
        submitSuccessMessage instanceof HTMLElement &&
        submitErrorMessage instanceof HTMLElement
    ) {
        contactForm.addEventListener('submit', async event => {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            submitSuccessMessage.classList.add('d-none');
            submitErrorMessage.classList.add('d-none');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Formspree respondeu com status ${response.status}`);
                }

                contactForm.reset();
                submitSuccessMessage.classList.remove('d-none');
            } catch (error) {
                console.error('Falha ao enviar mensagem pelo formulário de contato.', error);
                submitErrorMessage.classList.remove('d-none');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar mensagem!';
            }
        });
    }

});
