const REQUEST_URL = 'https://ajax.test-danit.com/api/v2/cards';

const autorization = async (email, password) => {
    const response = await fetch(`${REQUEST_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email, password: password })
    })
    if(response.status !== 200) {
        alert ("Incorrect username or password")
    } else {
        const token = await response.text();
        localStorage.setItem('token', token)
        return token
    }
}

const getCards = async () => {
    const response = await fetch(`${REQUEST_URL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
    const cards = await response.json();
    return cards
}

const createVisitForDoctor = async (formData) => {
    const response = await fetch(`${REQUEST_URL}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({...formData})
    })

    return response
}

const editCard = async (id, formData) => {
    const response = await fetch(`${REQUEST_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({...formData})
    })

    return response
}

const deleteCard = async (id) => {
    const response = await fetch(`${REQUEST_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

    return response

}

export {
    autorization,
    createVisitForDoctor,
    getCards,
    deleteCard,
    editCard,
}