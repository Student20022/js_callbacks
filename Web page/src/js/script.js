document.addEventListener('DOMContentLoaded', function () {
    const rootNode = document.body;
    let currentNode = rootNode.firstChild;

    function showNodeContent(node) {
        if (!node) return;

        if (node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim()) {
            currentNode = node.nextSibling;
            showNodeContent(currentNode);
            return;
        }

        const nodeContent = node.nodeType === Node.ELEMENT_NODE ? node.outerHTML : node.nodeValue;
        const message = `Текущий узел:\n${nodeContent}`;
        const nextButton = confirm(`${message}\n\nПерейти к следующему узлу?`);
        
        if (nextButton) {
            currentNode = node.nextSibling;
            showNodeContent(currentNode);
        } else {
            const backButton = confirm(`${message}\n\nВернуться к предыдущему узлу?`);
            if (backButton && node.previousSibling) {
                currentNode = node.previousSibling;
                showNodeContent(currentNode);
            } else {
                alert("Вы достигли границ узлов.");
            }
        }
    }

    showNodeContent(currentNode);
});
