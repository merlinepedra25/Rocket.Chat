import type { UpdateWriteOpResult, Cursor } from 'mongodb';
import type { IUser, IRole, IRoom, ILivechatAgent } from '@rocket.chat/core-typings';

import type { IBaseModel } from './IBaseModel';

export interface IUsersModel extends IBaseModel<IUser> {
	addRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][]): Promise<UpdateWriteOpResult>;
	findUsersInRoles(roles: IRole['_id'][], scope?: null, options?: any): Cursor<IUser>;
	findOneByUsername(username: string, options?: any): Promise<IUser>;
	findOneAgentById(_id: string, options: any): Promise<ILivechatAgent>;
	findUsersInRolesWithQuery(roles: IRole['_id'] | IRole['_id'][], query: any, options: any): any;
	findOneByUsernameAndRoomIgnoringCase(username: string, rid: IRoom['_id'], options: any): any;
	findOneByIdAndLoginHashedToken(_id: string, token: any, options?: any): any;
	findByActiveUsersExcept(
		searchTerm: any,
		exceptions: any,
		options: any,
		searchFields: any,
		extraQuery?: any,
		params?: { startsWith?: boolean; endsWith?: boolean },
	): any;

	findActive(options?: any): Cursor<IUser>;

	findActiveByIds(userIds: any, options?: any): Cursor<IUser>;

	findByIds(userIds: any, options?: any): Cursor<IUser>;

	findOneByUsernameIgnoringCase(username: any, options: any): any;

	findOneByLDAPId(id: any, attribute?: any): Promise<any>;

	findLDAPUsers(options?: any): any;

	findConnectedLDAPUsers(options?: any): any;

	isUserInRole(userId: IUser['_id'], roleId: IRole['_id']): Promise<boolean>;

	getDistinctFederationDomains(): any;

	getNextLeastBusyAgent(department: any, ignoreAgentId: any): Promise<any>;

	getLastAvailableAgentRouted(department: any, ignoreAgentId: any): Promise<any>;

	setLastRoutingTime(userId: any): Promise<any>;

	setLivechatStatusIf(userId: any, status: any, conditions?: any, extraFields?: any): any;

	getAgentAndAmountOngoingChats(userId: any): Promise<any>;

	findAllResumeTokensByUserId(userId: any): any;

	findActiveByUsernameOrNameRegexWithExceptionsAndConditions<T = IUser>(
		termRegex: any,
		exceptions: any,
		conditions: any,
		options: any,
	): Cursor<T>;

	countAllAgentsStatus({ departmentId }: { departmentId?: any }): any;

	getTotalOfRegisteredUsersByDate({ start, end, options }: { start: any; end: any; options?: any }): Promise<
		{
			date: string;
			users: number;
			type: 'users';
		}[]
	>;

	getUserLanguages(): any;

	updateStatusText(_id: any, statusText: any): any;

	updateStatusByAppId(appId: any, status: any): any;

	openAgentsBusinessHoursByBusinessHourId(businessHourIds: any): any;

	openAgentBusinessHoursByBusinessHourIdsAndAgentId(businessHourIds: any, agentId: any): any;

	addBusinessHourByAgentIds(agentIds: any, businessHourId: any): any;

	removeBusinessHourByAgentIds(agentIds: any, businessHourId: any): any;

	openBusinessHourToAgentsWithoutDepartment(agentIdsWithDepartment: any, businessHourId: any): any;

	closeBusinessHourToAgentsWithoutDepartment(agentIdsWithDepartment: any, businessHourId: any): any;

	closeAgentsBusinessHoursByBusinessHourIds(businessHourIds: any): any;

	updateLivechatStatusBasedOnBusinessHours(userIds?: any): any;

	setLivechatStatusActiveBasedOnBusinessHours(userId: any): any;

	isAgentWithinBusinessHours(agentId: any): Promise<any>;

	removeBusinessHoursFromAllUsers(): any;

	resetTOTPById(userId: any): any;

	unsetLoginTokens(userId: any): any;
	unsetOneLoginToken(userId: IUser['_id'], token: string): Promise<UpdateWriteOpResult>;

	removeNonPATLoginTokensExcept(userId: any, authToken: any): any;

	removeRoomsByRoomIdsAndUserId(rids: any, userId: any): any;

	removeRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][]): Promise<UpdateWriteOpResult>;

	isUserInRoleScope(uid: IUser['_id']): Promise<boolean>;

	addBannerById(_id: any, banner: any): any;

	findOneByAgentUsername(username: any, options: any): any;

	findOneByExtension(extension: any, options?: any): any;

	findByExtensions(extensions: any, options?: any): Cursor<IUser>;

	getVoipExtensionByUserId(userId: any, options: any): any;

	setExtension(userId: any, extension: any): any;

	unsetExtension(userId: any): any;

	getAvailableAgentsIncludingExt(includeExt: any, text: any, options: any): any;

	findActiveUsersTOTPEnable(options: any): any;

	findActiveUsersEmail2faEnable(options: any): any;

	findActiveByIdsOrUsernames(userIds: string[], options?: any): Cursor<IUser>;

	setAsFederated(userId: string): any;
}