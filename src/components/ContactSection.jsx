import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from "emailjs-com";

/**
 * Hiding API keys with environment variables:
 *
 * 1. Create a `.env.local` file at the root of your Next.js project (ensure it’s gitignored).
 *
 *    ```env
 *    NEXT_PUBLIC_EMAILJS_SERVICE_ID=abcd1234service
 *    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=efgh5678template
 *    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=ijkl9012public
 *    ```
 *
 * 2. Prefix public values with `NEXT_PUBLIC_` so they are bundled to the client.
 * 3. Restart your dev server (`npm run dev` or `yarn dev`) after adding or changing `.env.local`.
 * 4. If you still see a white page:
 *    - Check browser console for errors (missing env vars, runtime exceptions).
 *    - Ensure `serviceID`, `templateID`, and `publicKey` are not `undefined` before calling `emailjs.sendForm`.
 *    - Add a simple console.log:
 *      ```js
 *      console.log({ serviceID, templateID, publicKey });
 *      ```
 *    - Verify your Next.js version supports runtime env loading in client-side code.
 */
export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Load keys from environment
  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  // DEBUG: log env values after loading env vars
  console.log({ serviceID, templateID, publicKey });

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(serviceID, templateID, e.target, publicKey)
      .then(() => {
        toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        toast({ title: "Error sending message", description: "Please try again later.", variant: 'destructive' });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6" align="left">
              <ContactItem Icon={Mail} label="Email" value="hello@example.com" link="mailto:hello@example.com" />
              <ContactItem Icon={Phone} label="Phone" value="+1 (123) 456-7890" link="tel:+11234567890" />
              <ContactItem Icon={MapPin} label="Location" value="Your City, Your Country" />
            </div>
            <SocialLinks />
          </div>

          {/* Contact Form Column */}
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormField id="name" label="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" />
              <FormField id="email" type="email" label="Your Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" />
              <FormTextarea id="message" label="Your Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Hello, I'd like to talk about..." />
              <button
                type="submit" disabled={isSubmitting}
                className={cn("cosmic-button w-full flex items-center justify-center gap-2")}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simplified components for clarity
const ContactItem = ({ Icon, label, value, link }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h4 className="font-medium">{label}</h4>
      {link ? (
        <a href={link} className="text-muted-foreground hover:text-primary transition-colors">
          {value}
        </a>
      ) : (
        <span className="text-muted-foreground">{value}</span>
      )}
    </div>
  </div>
);

const SocialLinks = () => (
  <div className="pt-8">
    <h4 className="font-medium mb-4">Connect With Me</h4>
    <div className="flex space-x-4 justify-center">
      <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin /></a>
      <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
    </div>
  </div>
);

const FormField = ({ id, label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type} id={id} name={id} required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder={placeholder}
    />
  </div>
);

const FormTextarea = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-2">{label}</label>
    <textarea
      id={id} name={id} required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      placeholder={placeholder}
    />
  </div>
);
