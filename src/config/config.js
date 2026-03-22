const USER_ID = 135943;

const config = {
    BASE_URL: '/api/v2',
    ENDPOINTS: {
        LOGIN: '/clinic/login',
        CREATE_PET: `/clinic/user/${USER_ID}/pet`,
        FETCH_USER: `/clinic/doctor/${USER_ID}`,
        FETCH_PETS: '/clinic/pets-list',
        UPDATE_STATUS: '/pet',
    }
}

export default config