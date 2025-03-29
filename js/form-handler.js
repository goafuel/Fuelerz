document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        budget: document.getElementById('budget').value,
        deadline: document.getElementById('deadline').value || 'Not specified',
        details: document.getElementById('details').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.budget || !formData.details) {
        alert('Please fill in all required fields marked with *');
        return;
    }
    
    // Create WhatsApp message
    const message = `*New Order Request*%0A%0A
*Name:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Phone:* ${formData.phone}%0A
*Service Needed:* ${formData.service}%0A
*Budget:* ${formData.budget}%0A
*Deadline:* ${formData.deadline}%0A%0A
*Project Details:*%0A${formData.details.replace(/\n/g, '%0A')}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/919209933268?text=${message}`, '_blank');
    
    // Show success message
    alert('Thank you for your order! We\'ve opened WhatsApp for you to complete the process. If the window didn\'t open, please message us directly at +91 9209933268');
    
    // Reset form
    this.reset();
});
