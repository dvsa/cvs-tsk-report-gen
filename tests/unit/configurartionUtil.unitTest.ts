import { expect } from "chai";
import { Configuration } from "../../src/utils/Configuration";
import { IS3Config } from "../../src/models";

describe("ConfigurationUtil", () => {
        const config: Configuration = Configuration.getInstance();
        const branch = process.env.BRANCH;
        context("when calling the getS3Config() and the BRANCH environment variable is local", () => {
            process.env.BRANCH = "local";
            const s3config: IS3Config = config.getS3Config();
            it("should return the local S3 config", () => {
                expect (s3config.endpoint).to.equal("http://localhost:7000");
            });
        });

        context("when calling the getS3Config() and the BRANCH environment variable is not defined", () => {
            process.env.BRANCH = "";
            const s3config: IS3Config = config.getS3Config();
            it("should return the local S3 config", () => {
                expect (s3config.endpoint).to.equal("http://localhost:7000");
            });
        });

        context("when calling the getS3Config() and the BRANCH environment variable is different than local", () => {
            process.env.BRANCH = "test";
            const s3config: IS3Config = config.getS3Config();
            it("should return the local S3 config", () => {
                // tslint:disable-next-line:no-unused-expression
                expect (s3config).to.be.empty;
            });
        });

        process.env.BRANCH = branch;
    });