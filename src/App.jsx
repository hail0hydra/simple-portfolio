import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Portfolio() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);
    const terminalEndRef = useRef(null);

    useEffect(() => {
        // Force dark mode
        document.documentElement.classList.add("dark");

        setOutput([
            {
                cmd: "",
                res: [
                    "<span class='text-green-400'>Welcome to Avinash's Hacker Terminal Portfolio!</span>",
                    "<span class='text-green-400'>Type 'help' for commands.</span>"
                ]
            }
        ]);
    }, []);

    const commands = {
        help: [
            "<span class='text-green-400'>Available commands:</span> about, experience, projects, skills, contact, cv, whoami, fastfetch, date, clear"
        ],
        about: [
            "<span class='text-green-400'>I'm Avinash Sharma, cybersecurity enthusiast.</span>",
            "<span class='text-green-400'>Lead of EcryptEdge & RCS CTF | HackTheBox Top 1000.</span>"
        ],
        experience: ["<span class='text-green-400'>Hack The Box (CTF Player) | CTF Administration & Development</span>"],
        projects: [
            "<span class='text-green-400'>- PyVTFile (VirusTotal API)</span>",
            "<span class='text-green-400'>- QwertyCapture-lite (Keylogger PoC)</span>",
            "<span class='text-green-400'>- DISdomain (DNS enumeration tool)</span>"
        ],
        skills: [
            "<span class='text-green-400'>Linux, Networking, Python, C/C++, Bash, PowerShell, JavaScript, Nmap, Burp Suite, Ghidra, IDA, React, Docker, KVM/QEMU</span>"
        ],
        contact: [
            "<span class='text-green-400'>Email: avinasharma.2412@gmail.com</span>",
            "<span class='text-cyan-400'>GitHub: github.com/hail0hydra</span>",
            "<span class='text-cyan-400'>LinkedIn: linkedin.com/in/avinash-sharma-me</span>"
        ],
        cv: [
            '<a href="./Avinash-Sharma-Resume.pdf" target="_blank" rel="noopener noreferrer" class="underline text-green-400 hover:text-cyan-400">Download CV</a>'
        ],
        whoami: ["<span class='text-green-400 font-bold'>avinash@portfolio</span>"],
        fastfetch: [
            "<span class='text-green-400 font-bold'>Avinash Sharma | Cybersecurity Enthusiast | HackTheBox Top 1000</span>",
            "<span class='text-green-400'>OS: Arch Linux | Shell: zsh | CPU: Intel i7 | RAM: 16GB</span>"
        ],
        date: [`<span class='text-green-400'>${new Date().toString()}</span>`],
        clear: () => { setOutput([]); return []; },
    };

    const handleCommand = (e) => {
        e.preventDefault();
        if (!command.trim()) return;

        const cmdLower = command.toLowerCase();
        let response = commands[cmdLower] || [`<span class='text-red-600'>Command not found: ${command}</span>`];
        if (!Array.isArray(response)) response = [response];
        if (cmdLower === "clear") response = commands.clear();

        setOutput([...output, { cmd: command, res: response }]);
        setCommand("");
    };

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <div className="flex flex-col h-screen w-screen bg-black text-green-400 font-mono p-4">
            <div className="flex-1 overflow-hidden">
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {output.map((line, idx) => (
                            <div key={idx}>
                                {line.cmd && (
                                    <p>
                                        <span className="text-green-500 font-bold">$</span>{" "}
                                        <span className="text-green-400 font-bold">{line.cmd}</span>
                                    </p>
                                )}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {line.res.map((text, i) => (
                                        <p key={i} dangerouslySetInnerHTML={{ __html: text }} />
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                        <div ref={terminalEndRef} />
                    </div>

                    <form onSubmit={handleCommand} className="flex mt-2 items-center">
                        <span className="mr-2 text-green-500 font-bold">$</span>
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-black text-green-400 outline-none border-none caret-green-500"
                            autoFocus
                        />
                        <span className="ml-1 w-1 h-5 bg-green-500 animate-blink" />
                    </form>
                </div>
            </div>

            <style>
                {`
@keyframes blink {
0%, 50%, 100% { opacity: 1; }
25%, 75% { opacity: 0; }
}
.animate-blink {
animation: blink 1s step-start infinite;
}
`}
            </style>
        </div>
    );
}

