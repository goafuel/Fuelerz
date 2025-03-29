document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        deadline: document.getElementById('deadline').value,
        details: document.getElementById('details').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.budget || !formData.details) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Send to WhatsApp (using WhatsApp API)
    const phoneNumber = '917722011476';
    const message = `New Order from Fuelerz Website:
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Budget: ${formData.budget}
Deadline: ${formData.deadline || 'Not specified'}
Details: ${formData.details}
    
Please respond promptly.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Optional: Send to email using FormSubmit.co or other service
    // fetch('https://formsubmit.co/ajax/your@email.com', {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.log(error));
    
    // Show success message
    alert('Thank you for your order! We\'ve opened WhatsApp for you to complete the process. If the window didn\'t open, please message us directly at +91 9209933268');
    
    // Reset form
    this.reset();
});