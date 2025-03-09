"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const create_session_usecase_1 = require("../usecases/create.session.usecase");
tsyringe_1.container.registerSingleton("CreateSessionUseCase", create_session_usecase_1.CreateSessionUseCase);
