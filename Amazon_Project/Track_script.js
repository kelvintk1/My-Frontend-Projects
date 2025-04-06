document.addEventListener("DOMContentLoaded", function () {
    const trackedProduct = JSON.parse(localStorage.getItem("tracked_product"));

    if (trackedProduct) {
        document.querySelector(".tracked_order").innerHTML = `
            <h2>Tracked Package</h2>
            <div class="trackOrder_item">
                <div class="picture"> 
                    <img src="${trackedProduct.image}" class="order_image">
                </div>
                <div class="order_details">
                    <h3 class="order_name">${trackedProduct.product_Name}</h3>
                    <p class="order_quantity">Quantity: ${trackedProduct.quantity}</p>
                    <p class="order_price">Price: $${trackedProduct.price}</p>
                    <p>Status: <span id="orderStatus">In Transit</span></p>
                </div>
            </div>
            <hr>
        `;

        // Insert Progress Bar inside .progress_area
        document.querySelector(".progress_area").innerHTML = `
            <div class="progress">
                <svg class="progress-ring" width="120" height="120">
                    <circle class="progress-ring-bg" cx="60" cy="60" r="50"></circle>
                    <circle class="progress-ring-fill" cx="60" cy="60" r="50"></circle>
                </svg>
                <div class="progress-text" id="progressText">50%</div>
            </div>
            <button id="updateStatus">Update Status</button>
        `;

        // Select necessary elements
        const progressFill = document.querySelector(".progress-ring-fill");
        const progressText = document.getElementById("progressText");
        const statusText = document.getElementById("orderStatus");
        const updateStatusBtn = document.getElementById("updateStatus");

        let statusIndex = 1; // Starts at "In Transit"
        const statusSteps = ["Order Placed", "In Transit", "Out for Delivery", "Delivered"];
        const progressValues = [25, 50, 75, 100]; // Progress in percentage

        updateStatusBtn.addEventListener("click", function () {
            if (statusIndex < statusSteps.length) {
                statusText.textContent = statusSteps[statusIndex];
                let progressPercent = progressValues[statusIndex];

                // Update circular progress bar
                let circumference = 2 * Math.PI * 50; // 2πr
                let offset = circumference * (1 - progressPercent / 100);
                progressFill.style.strokeDashoffset = offset;

                // Update progress percentage text
                progressText.textContent = `${progressPercent}%`;

                statusIndex++;
            }
        });
    } else {
        document.querySelector(".tracked_order").innerHTML = `<p>No tracked package found.</p>`;
    }
});
