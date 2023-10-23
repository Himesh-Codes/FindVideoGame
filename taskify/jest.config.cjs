module.exports = {
        preset: "ts-jest",
        testEnvironment: "jest-environment-jsdom",
        transform: {
        "\\.(js|jsx|ts)$": "babel-jest"
        },
        moduleDirectories: ["node_modules", "src"],
        setupFilesAfterEnv: ["@testing-library/jest-dom"],
        moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        },
};