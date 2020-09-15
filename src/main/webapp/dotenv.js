/**
 * Update this file with the script infrastructure/dotenv-sed.sh
 *
 * 1) Copy .env.example to .env (place it into the projects root folder)
 * 2) Execute "cd infrastructure && ./dotenv-sed.sh"
 */
window.env = {
	SERVER_PORT: "8999",
	ENDPOINT_URL: "http://localhost:8999/",
	ODH_MOBILITY_API_URI: "https://mobility.api.opendatahub.testingmachine.eu",
	THUNDERFOREST_MAP_API_KEY: "",
	KEYCLOAK_AUTHORIZATION_URI: "https://auth.opendatahub.testingmachine.eu/auth",
	KEYCLOAK_REALM: "noi",
	KEYCLOAK_CLIENT_ID: "odh-mobility-analytics",
	KEYCLOAK_REDIRECT_URI: "http://localhost:8999/",
	KEYCLOAK_SILENT_CHECK_SSO_REDIRECT_URI: "http://localhost:8999/callback.html",
}
