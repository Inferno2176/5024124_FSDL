document.addEventListener("DOMContentLoaded", function () {

    let cartCount = 0

    let cart = document.getElementById("cart")
    let profile = document.getElementById("profile")
    let search = document.querySelector(".searchbar")
    let cards = document.querySelectorAll(".card")
    let buttons = document.querySelectorAll(".btn-card")
    let toast = document.getElementById("toast")

    function showToast(message) {
        toast.innerText = message
        toast.classList.add("show")

        setTimeout(function () {
            toast.classList.remove("show")
        }, 2000)
    }

    cart.onclick = function () {
        cartCount++
        showToast("Items in cart: " + cartCount)
    }

    profile.onclick = function () {
        document.getElementById("loginModal").style.display = "flex"
    }

    document.addEventListener("click", function (e) {
        let modal = document.getElementById("loginModal")
        if (e.target === modal) {
            modal.style.display = "none"
        }
        if (e.target.classList.contains("modal-close")) {
            modal.style.display = "none"
        }
    })

    let loginForm = document.getElementById("loginForm")
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault()
            let email = document.getElementById("email").value
            let password = document.getElementById("password").value
            if (email && password) {
                showToast("Welcome back!")
                document.getElementById("loginModal").style.display = "none"
                loginForm.reset()
            }
        }
    }

    search.addEventListener("keyup", function () {
        let value = search.value.toLowerCase()

        cards.forEach(function (card) {
            let text = card.innerText.toLowerCase()
            card.style.display = text.includes(value) ? "block" : "none"
        })
    })

    buttons.forEach(function (btn) {
        btn.onclick = function () {
            showToast("Added to cart")
        }
    })

})
