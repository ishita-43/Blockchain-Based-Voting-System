<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if any items are selected
    if (isset($_POST['items']) && !empty($_POST['items'])) {
        // Retrieve the selected items
        $selected_items = $_POST['items'];
        
        // Display the selected items
        echo "You have selected the following items:<br>";
        echo "<ul>";
        foreach ($selected_items as $item) {
            echo "<li>" . htmlspecialchars($item) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "No items selected.";
    }
} else {
    echo "Invalid request method.";
}
?>
