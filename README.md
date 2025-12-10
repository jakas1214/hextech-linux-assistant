# Hextech Linux Assistant

An AI-powered web application designed to help Linux users install, configure, and troubleshoot League of Legends.

## 🚀 How to Upload to GitHub

If you want to host this code on your own GitHub repository, follow these steps in your terminal:

### 1. Initialize Git
First, initialize a new git repository in your project folder:
```bash
git init
```

### 2. Stage and Commit Files
Add all your files to the staging area and create your first commit:
```bash
git add .
git commit -m "Initial commit: Hextech Linux Assistant"
```

### 3. Create Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository (e.g., `hextech-linux-assistant`).
4. Click **Create repository**.

### 4. Push to GitHub
Copy the commands provided by GitHub under "…or push an existing repository from the command line" and run them. They will look like this:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hextech-linux-assistant.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

## 🛠️ Features

- **Install Scripts**: Generates distro-specific installation bash scripts via Gemini AI.
- **Anti-Cheat Config**: Checks for TPM 2.0 and Secure Boot compliance.
- **Troubleshooter**: Analyze error logs using AI to find solutions.

## 📦 Tech Stack

- React 18
- Tailwind CSS
- Google Gemini API (`@google/genai`)
- Lucide React Icons
