class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

class LoginError extends Error {
    constructor(message) {
        super(message)
        this.name = "LoginError"
    }
}

function validateEmail(email) {
    if (!email) {
        throw new ValidationError("Email is required")
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw new ValidationError("Invalid email format")
    }
}

function validatePassword(password) {
    if (!password) {
        throw new ValidationError("Password is required")
    }
    if (password.length < 6) {
        throw new ValidationError("Password must be at least 6 characters")
    }
}

function clearErrors() {
    document.getElementById("emailError").innerText = ""
    document.getElementById("passwordError").innerText = ""
    document.getElementById("message").innerText = ""
    document.getElementById("message").className = "message"
    document.getElementById("email").classList.remove("invalid")
    document.getElementById("password").classList.remove("invalid")
}

function showError(fieldId, errorId, message) {
    document.getElementById(errorId).innerText = message
    document.getElementById(fieldId).classList.add("invalid")
}

function showMessage(message, type) {
    const messageEl = document.getElementById("message")
    messageEl.innerText = message
    messageEl.className = "message " + type
}

function handleLogin(email, password) {
    if (email === "user@example.com" && password === "password123") {
        return true
    }
    throw new LoginError("Invalid email or password")
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault()
    
    clearErrors()
    
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
    try {
        try {
            validateEmail(email)
        } catch (error) {
            if (error instanceof ValidationError) {
                showError("email", "emailError", error.message)
                throw error
            }
            throw new LoginError("Email validation failed")
        }
        
        try {
            validatePassword(password)
        } catch (error) {
            if (error instanceof ValidationError) {
                showError("password", "passwordError", error.message)
                throw error
            }
            throw new LoginError("Password validation failed")
        }
        
        try {
            handleLogin(email, password)
        } catch (error) {
            if (error instanceof LoginError) {
                showMessage(error.message, "error")
                throw error
            }
            throw new LoginError("Login process failed")
        }
        
        showMessage("Login successful! Redirecting...", "success")
        
        setTimeout(function() {
            alert("Welcome " + email)
        }, 1500)
    
    } catch (error) {
        console.error("Error during login:", error.name, "-", error.message)
    
    } finally {
        console.log("Login attempt completed at " + new Date().toLocaleTimeString())
    }
})

document.getElementById("email").addEventListener("blur", function() {
    try {
        validateEmail(this.value)
        document.getElementById("emailError").innerText = ""
        this.classList.remove("invalid")
    } catch (error) {
        showError("email", "emailError", error.message)
    }
})

document.getElementById("password").addEventListener("blur", function() {
    try {
        validatePassword(this.value)
        document.getElementById("passwordError").innerText = ""
        this.classList.remove("invalid")
    } catch (error) {
        showError("password", "passwordError", error.message)
    }
})
