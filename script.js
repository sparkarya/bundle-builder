const requiredItems = 3;
const selectedItems = new Set();
const prices = {
  1: 100,
  2: 150,
  3: 200,
  4: 180,
  5: 400,
  6: 350,
  7: 220
};

function toggleProduct(id) {
  const card = document.querySelector(`.card[data-id='${id}']`);
  const button = card.querySelector('button');

  if (selectedItems.has(id)) {
    selectedItems.delete(id);
    button.textContent = 'Add';
    button.classList.remove('active');
  } else {
    if (selectedItems.size >= requiredItems) return;
    selectedItems.add(id);
    button.textContent = 'Remove';
    button.classList.add('active');
  }

  updateUI();
}

function updateUI() {
  const selectedCount = selectedItems.size;
  const totalPrice = Array.from(selectedItems).reduce((sum, id) => sum + prices[id], 0);

  document.getElementById('selectedCount').textContent = selectedCount;
  document.getElementById('totalPrice').textContent = totalPrice;
  document.getElementById('progressFill').style.width = `${(selectedCount / requiredItems) * 100}%`;

  // Enable or disable Add to Cart button
  document.getElementById('addToCart').disabled = selectedCount !== requiredItems;
}

// ✅ Add to Cart functionality
document.getElementById('addToCart').addEventListener('click', () => {
  if (selectedItems.size !== requiredItems) return;

  const items = Array.from(selectedItems);
  const total = items.reduce((sum, id) => sum + prices[id], 0);
  alert(`🛒 Items added to cart: ${items.join(', ')}\n💰 Total: ₹${total}`);

  // Optional: Redirect or store in localStorage
  // localStorage.setItem("cartItems", JSON.stringify(items));
  // window.location.href = "cart.html";
});
