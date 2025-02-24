// Sample dataset
const items = [
    { rfid: 1001, name: "Item1", price: 10, quantity: 10, expiry_date: "2025-06-10" },
    { rfid: 1002, name: "Item2", price: 12, quantity: 15, expiry_date: "2025-03-25" },
    { rfid: 1003, name: "Item3", price: 14, quantity: 30, expiry_date: "2025-05-15" },
    { rfid: 1004, name: "Item4", price: 16, quantity: 8, expiry_date: "2025-07-20" },
    { rfid: 1005, name: "Item5", price: 18, quantity: 12, expiry_date: "2025-08-10" },
    { rfid: 1006, name: "Item6", price: 20, quantity: 20, expiry_date: "2025-04-18" },
    { rfid: 1007, name: "Item7", price: 22, quantity: 15, expiry_date: "2025-06-05" },
    { rfid: 1008, name: "Item8", price: 24, quantity: 50, expiry_date: "2026-01-12" },
    { rfid: 1009, name: "Item9", price: 26, quantity: 40, expiry_date: "2026-02-15" },
    { rfid: 1010, name: "Item10", price: 28, quantity: 25, expiry_date: "2026-03-10" }
];

let selectedItems = [];

// Populate dropdown list dynamically
function populateDropdown() {
    const dropdownList = document.querySelector(".dropdown-list");
    dropdownList.innerHTML = ""; // Clear previous list

    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        li.onclick = () => selectItem(item);
        dropdownList.appendChild(li);
    });
}

// Handle item selection
function selectItem(item) {
    // Close dropdown after selection
    document.querySelector(".dropdown-list").style.display = "none";

    // Add item to selected list
    const existingItem = selectedItems.find(i => i.rfid === item.rfid);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        selectedItems.push({ ...item, quantity: 1 });
    }

    updateItemList();
}

// Update the list of selected items
function updateItemList() {
    const itemList = document.querySelector(".item-list");
    const totalCostElement = document.querySelector(".total-cost strong");
    itemList.innerHTML = "";

    let totalCost = 0;

    selectedItems.forEach(item => {
        totalCost += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("selected-item");
        div.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        itemList.appendChild(div);
    });

    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

// Reset selection
function resetCount() {
    selectedItems = [];
    updateItemList();
}

// Submit selected items
function submitItems() {
    if (selectedItems.length === 0) {
        alert("No items selected!");
        return;
    }

    const customerName = document.querySelector("#customername input").value;
    const customerAge = document.querySelector("#customerage input").value;
    const customerEmail = document.querySelector("#customeremail input").value;
    const customerContact = document.querySelector("#customercontact input").value;

    const orderData = {
        customer: {
            name: customerName,
            age: customerAge,
            email: customerEmail,
            contact: customerContact
        },
        items: selectedItems
    };

    console.log("Submitting Order:", JSON.stringify(orderData, null, 2));

    // Simulating fetch to backend (Replace with actual API call)
    fetch("https://your-backend-api.com/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Order submitted successfully!");
        console.log("Response:", data);
        selectedItems = [];
        updateItemList();
    })
    .catch(error => console.error("Error submitting order:", error));
}

// Toggle dropdown visibility
document.querySelector(".dropdown-btn").addEventListener("click", () => {
    const dropdownList = document.querySelector(".dropdown-list");
    dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
});

// Initialize dropdown items on load
populateDropdown();
