async function fetchData() {
    try {
        const url = 'http://localhost:3000/inventry';
        console.log(url);

        const response = await fetch(url, { 
            method: 'GET',
            mode: 'cors' // This tells the browser it's a cross-origin request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
        console.log(data);

        // const sectiondata= fetchSectiondata();
        // for (let i = 0; i < data.length; i++) {
        //     data[i].section=sectiondata
        // }
        data.forEach(item => {
            const row = `<tr>
                <td>${item.rfid}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.expirty_date}</td>
                <td>${item.Threshold}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
async function fetchSectiondata() {
    try {
        const url = 'http://localhost:3000/location';
        console.log(url);

        const response = await fetch(url, { 
            method: 'GET',
            mode: 'cors' // This tells the browser it's a cross-origin request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
        
        

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchSalesData() {
    try {
        const saleResponse = await fetch('backend/sales.json'); // Change URL as needed
        const salesData = await saleResponse.json();
        const salesTableBody = document.getElementById('sales-table-body');
        salesTableBody.innerHTML = '';
        
        salesData.forEach(sale => {
            const saleRow = `<tr>
                <td>${sale.date}</td>
                <td>${sale.attributes}</td>
                <td>${sale.price}</td>
                <td>${sale.total_sale}</td>
            </tr>`;
            salesTableBody.innerHTML += saleRow;
        });
        
        document.getElementById('sales-section').style.display = 'block';
    } catch (error) {
        console.error('Error fetching sales data:', error);
    }
}

async function fetchSuggestion() {
    try {
        const response = await fetch('backend/suggestion.json'); // Change URL as needed
        const data = await response.json();
        document.getElementById('suggestion-box').innerText = data.suggestion;
    } catch (error) {
        console.error('Error fetching suggestion:', error);
    }
}



document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    document.getElementById('show-sales').addEventListener('click', fetchSalesData);
});
