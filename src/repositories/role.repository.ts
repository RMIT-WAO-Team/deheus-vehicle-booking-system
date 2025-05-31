import AppDataSource from "../configs/data-source.config";
import {Role} from "../entities/Role";
import {EntityManager, In} from "typeorm";

const RoleRepository = AppDataSource.getRepository(Role);

export const getRolesById = async (ids: string[], manager: EntityManager) => {
    return await manager.findBy(Role, {
        roleId: In(ids)
    });
};
