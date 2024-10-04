

import { useState,useEffect,useRef } from "react";
import {
    motion,
    useAnimation,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    ChevronDown,
    Star,
    Dumbbell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card,CardContent } from "@/components/ui/card";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { ceo,cto,hcr } from "@/assets/team/index"

const team = [
    {
        name: "John Doe",
        role: "CEO",
        bio: "Fitness enthusiast with 20 years of industry experience.",
        avatar: ceo,
    },
    {
        name: "Jane Smith",
        role: "CTO",
        bio: "Tech guru passionate about integrating technology with fitness.",
        avatar: cto,
    },
    {
        name: "Mike Johnson",
        role: "Head of Customer Relations",
        bio: "Dedicated to ensuring customer satisfaction and support.",
        avatar: hcr,
    },
]


const milestones = [
    { year: 2010,event: "PrimeLifeFit founded" },
    { year: 2013,event: "Launched first product line" },
    { year: 2015,event: "Expanded to international markets" },
    { year: 2018,event: "Introduced AI-powered fitness tracking" },
    { year: 2020,event: "Launched virtual training platform" },
    { year: 2023,event: "Reached 1 million customers worldwide" },
];

const values = [
    { title: "Innovation",description: "Constantly pushing the boundaries of fitness technology" },
    { title: "Quality",description: "Delivering top-notch products that stand the test of time" },
    { title: "Community",description: "Fostering a supportive network of fitness enthusiasts" },
    { title: "Sustainability",description: "Committed to eco-friendly practices in all operations" },
];

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    },[controls,isInView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.5 }}
            variants={{
                visible: { opacity: 1,y: 0 },
                hidden: { opacity: 0,y: 100 },
            }}
        >
            {children}
        </motion.div>
    );
};

const ParallaxSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress,[0,1],[0,-50]);

    return <motion.div style={{ y }}>{children}</motion.div>;
};

export default function AboutUs() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:",{ name,email,message });
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="wrapper py-16">
                <motion.h1
                    className="text-6xl font-bold  mb-16 flex  text-primary"
                    initial={{ opacity: 0,y: 100 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    About
                    <span
                        className=" text-transparent select-none flex w-fit items-center ml-8"
                        style={{
                            WebkitTextStroke: "0.2px black",
                        }}
                        aria-hidden="true"
                    >
                        <Dumbbell size={60} className="text-primary" />
                        PrimeLifeFit
                    </span>
                </motion.h1>

                <ParallaxSection>
                    <FadeInSection>
                        <Card className="bg-card text-card-foreground shadow-lg overflow-hidden mb-16 rounded-none">
                            <CardContent className="p-8">
                                <h2 className="text-3xl font-semibold mb-4 text-primary">
                                    Our Story
                                </h2>
                                <p className="text-lg leading-relaxed">
                                    Founded in 2010, PrimeLifeFit has been at the forefront of the
                                    fitness equipment industry for over a decade. Our mission is
                                    to provide high-quality, innovative fitness solutions that
                                    empower individuals to achieve their health and wellness
                                    goals. We envision a world where everyone has access to the
                                    tools they need to lead a healthy, active lifestyle. Over the years,
                                    we have expanded our product range to include state-of-the-art
                                    equipment, personalized training programs, and a supportive community
                                    that encourages individuals to push their limits. Our commitment to
                                    sustainability and ethical practices ensures that we not only care
                                    for our customers but also for the planet. We believe that fitness
                                    is not just a goal but a journey, and we are here to support you
                                    every step of the way, providing resources, guidance, and inspiration
                                    to help you live your best life.
                                </p>
                            </CardContent>
                        </Card>
                    </FadeInSection>
                </ParallaxSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8 text-primary">Our Journey</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {milestones.map((milestone,index) => (
                            <motion.div
                                key={index}
                                className="bg-card text-card-foreground p-6 rounded-lg shadow-md"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring",stiffness: 300 }}
                            >
                                <h3 className="text-2xl font-bold mb-2">{milestone.year}</h3>
                                <p>{milestone.event}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeInSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8  text-primary">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {team.map((member,index) => (
                            <motion.div
                                key={index}
                                className="bg-card text-card-foreground p-6 rounded-none border border-dotted shadow-lg"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                }}
                                transition={{ type: "spring",stiffness: 300 }}
                            >
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold mb-2 ">
                                    {member.name}
                                </h3>
                                <p className="text-sm mb-2  text-muted-foreground">
                                    {member.role}
                                </p>
                                <p className="text-sm ">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeInSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8 text-primary">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {values.map((value,index) => (
                            <Card key={index} className="bg-card text-card-foreground">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                    <p>{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </FadeInSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8  text-primary">
                        What Our Customers Say
                    </h2>
                    <Tabs defaultValue="testimonials" className="mb-16">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="testimonials">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    {
                                        name: "Sarah L.",
                                        quote:
                                            "FitGear Pro has transformed my home workouts. Their equipment is top-notch!",
                                        avatar: "/placeholder.svg?height=60&width=60",
                                    },
                                    {
                                        name: "Mark T.",
                                        quote:
                                            "Excellent customer service and fast shipping. Highly recommended!",
                                        avatar: "/placeholder.svg?height=60&width=60",
                                    },
                                ].map((testimonial,index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-card text-card-foreground p-6 rounded-xl shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring",stiffness: 300 }}
                                    >
                                        <div className="flex items-center mb-4">
                                            <Avatar className="w-12 h-12 mr-4 border-2 border-primary">
                                                <AvatarImage
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                />
                                                <AvatarFallback>
                                                    {testimonial.name.split(" ")[0][0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-lg font-semibold">
                                                    {testimonial.name}
                                                </p>
                                                <div className="flex">
                                                    {[...Array(5)].map((_,i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-5 h-5 text-[hsl(var(--chart-4))] fill-current"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-lg italic">"{testimonial.quote}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="reviews">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        name: "Alex K.",
                                        rating: 5,
                                        review:
                                            "The quality of FitGear Pro equipment is unmatched. Worth every penny!",
                                    },
                                    {
                                        name: "Emma R.",
                                        rating: 4,
                                        review:
                                            "Great products, but delivery took a bit longer than expected.",
                                    },
                                    {
                                        name: "Chris M.",
                                        rating: 5,
                                        review:
                                            "The customer support team went above and beyond to help me. Impressive!",
                                    },
                                ].map((review,index) => (
                                    <Card key={index} className="bg-card text-card-foreground">
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold mb-2">{review.name}</h3>
                                            <div className="flex mb-2">
                                                {[...Array(5)].map((_,i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                            ? "text-[hsl(var(--chart-4))]"
                                                            : "text-muted"
                                                            } fill-current`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm">{review.review}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </FadeInSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8 text-primary">Our Commitment to Sustainability</h2>
                    <Card className="bg-card text-card-foreground shadow-lg overflow-hidden mb-16">
                        <CardContent className="p-8">
                            <p className="text-lg leading-relaxed mb-4">
                                At PrimeLifeFit, we're committed to not only improving your fitness but also protecting our planet. Our sustainability initiatives include:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Using recycled materials in our product packaging</li>
                                <li>Implementing energy-efficient practices in our manufacturing processes</li>
                                <li>Partnering with eco-friendly shipping providers</li>
                                <li>Offering a product recycling program for old fitness equipment</li>
                            </ul>
                        </CardContent>
                    </Card>
                </FadeInSection>

                <FadeInSection>
                    <h2 className="text-4xl font-semibold mb-8 text-primary">Community Involvement</h2>
                    <Card className="bg-card text-card-foreground shadow-lg overflow-hidden mb-16">
                        <CardContent className="p-8">
                            <p className="text-lg leading-relaxed mb-4">
                                We believe in giving back to the communities we serve. Some of our initiatives include:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Annual fitness challenges that raise funds for local charities</li>
                                <li>Free fitness classes in underserved neighborhoods</li>
                                <li>Equipment donations to schools and community centers</li>
                                <li>Sponsorship of local sports teams and events</li>
                            </ul>
                        </CardContent>
                    </Card>
                </FadeInSection>

                <FadeInSection>
                    <Card className="bg-card text-card-foreground shadow-xl overflow-hidden">
                        <CardContent className="p-8">
                            <h2 className="text-4xl font-semibold mb-8  text-primary">
                                Get in Touch
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="flex items-center mb-4 text-lg">
                                        <Mail className="mr-2 text-primary" /> info@fitgearpro.com
                                    </p>
                                    <p className="flex items-center mb-4 text-lg">
                                        <Phone className="mr-2 text-primary" /> +1 (555) 123-4567
                                    </p>
                                    <p className="flex items-center mb-6 text-lg">
                                        <MapPin className="mr-2 text-primary" /> 123 Fitness Street,
                                        Healthy City, FC 12345
                                    </p>
                                    <div className="flex space-x-4">
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.2,color: "hsl(var(--primary))" }}
                                            className="text-muted-foreground"
                                        >
                                            <Facebook size={24} />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.2,color: "hsl(var(--primary))" }}
                                            className="text-muted-foreground"
                                        >
                                            <Twitter size={24} />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            whileHover={{ scale: 1.2,color: "hsl(var(--primary))" }}
                                            className="text-muted-foreground"
                                        >
                                            <Instagram size={24} />
                                        </motion.a>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="bg-input text-foreground placeholder-muted-foreground"
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-input text-foreground placeholder-muted-foreground"
                                    />
                                    <Textarea
                                        placeholder="Your Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        className="bg-input text-foreground placeholder-muted-foreground"
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </FadeInSection>

                <motion.div
                    className=" mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1,duration: 1 }}
                >
                    <ChevronDown
                        className="mx-auto animate-bounce text-primary"
                        size={32}
                    />
                </motion.div>
            </div>
        </div>
    );
}