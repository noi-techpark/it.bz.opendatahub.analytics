// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

let AUTHORIZATION_TOKEN = '';

$(document).ready(function () {

    let login_button = $('#login_button');
    let logout = $('#logout-container');
    let logoutuser = $('#logoutuser');
    let logout_button = $('#logout_button');

    var keycloak = new Keycloak({
        url: env.KEYCLOAK_AUTHORIZATION_URI,
        realm: env.KEYCLOAK_REALM,
        clientId: env.KEYCLOAK_CLIENT_ID
    });

    let setupAuthenticated = function () {
        AUTHORIZATION_TOKEN = keycloak.authenticated && !keycloak.isTokenExpired() ? 'Bearer ' + keycloak.token : '';
        login_button.css('display', 'none');
        logout.css('display', 'flex');
        logoutuser.text(keycloak.idTokenParsed.name)
    }
    let setupNonAuthenticated = function () {
        AUTHORIZATION_TOKEN = null;
        login_button.css('display', 'flex');
        logout.css('display', 'none');
    }

    keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: env.KEYCLOAK_SILENT_CHECK_SSO_REDIRECT_URI
    }).then(function (authenticated) {
        if (!authenticated) {
            setupNonAuthenticated();
        }
    }).catch(function () {
        alert('failed to initialize');
    });
    keycloak.onAuthSuccess = function () {
        setupAuthenticated();
    }
    keycloak.onAuthError = function () {
        setupNonAuthenticated();
    }
    keycloak.onAuthLogout = function () {
        setupNonAuthenticated();
    }

    login_button.click(function () {
        keycloak.login({
            redirectUri: env.KEYCLOAK_REDIRECT_URI
        })
    })
    logout_button.click(function () {
        keycloak.logout({
            redirectUri: env.KEYCLOAK_REDIRECT_URI
        })
    })

    setInterval(() => {
        keycloak.updateToken(30).then(function() {
            setupAuthenticated();
        }).catch(function() {
            if(!keycloak.authenticated || keycloak.isTokenExpired()) {
                setupNonAuthenticated();
            }
        });
    }, 60000)

})