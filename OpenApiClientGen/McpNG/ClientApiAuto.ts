import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
export namespace MyNS {
	export interface BBSReportRequestType {
		payeeProvider: ProviderType;
		claimId?: string;
		lodgementDate?: Date;
	}

	export interface ProviderType {
		providerNumber: string;
	}

	export interface BBSPaymentReportResponseType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;
		claimSummary?: Array<ClaimSummaryType>;
		status: string;
	}

	export interface PaymentRunType {
		payerName?: string;
		runDate?: Date;
		runNumber?: string;
	}

	export interface PaymentType {
		accountInfo: BankAccountType;
		depositAmount?: string;
		paymentReference?: string;
	}

	export interface BankAccountType {
		accountName?: string;
		accountNumber?: string;
		bsbCode?: string;
	}

	export interface ClaimSummaryType {
		accountReferenceId?: string;
		benefit?: string;
		chargeAmount?: string;
		claimChannelCode?: string;
		claimId?: string;
		lodgementDate?: Date;
		transactionId?: string;
	}

	export interface ServiceMessagesType {
		highestSeverity: ServiceMessagesTypeHighestSeverity;
		serviceMessage: Array<ServiceMessageType>;
	}

	export enum ServiceMessagesTypeHighestSeverity { Fatal = 'Fatal', Error = 'Error', Warning = 'Warning', Informational = 'Informational' }

	export interface ServiceMessageType {
		code: string;
		severity: ServiceMessagesTypeHighestSeverity;
		reason: string;
	}

	export interface BBSProcessingReportResponseType {
		claimAssessment?: ClaimAssessmentType;
		status: string;
	}

	export interface ClaimAssessmentType {
		medicalEvent?: Array<MedicalEventResponseType>;
		serviceProvider?: ProviderType;
		benefitPaid?: string;
		chargeAmount?: string;
		claimId?: string;
	}

	export interface MedicalEventResponseType {
		patient?: MembershipStatusType;
		service?: Array<ServiceResponseType>;
		id?: string;
		eventDate?: Date;
	}

	export interface MembershipStatusType {
		status?: StatusType;
		currentMembership?: MembershipType;
		currentMember?: IdentityType;
		processDate?: Date;
	}

	export interface StatusType {
		code?: number;
		text?: string;
	}

	export interface MembershipType {
		memberNumber?: string;
		memberRefNumber?: string;
	}

	export interface IdentityType {
		dateOfBirth?: Date;
		familyName?: string;
		givenName?: string;
		secondInitial?: string;
		sex?: string;
	}

	export interface ServiceResponseType {
		error?: StatusType;
		id?: string;
		assessmentCode?: string;
		benefitPaid?: string;
		chargeAmount?: string;
		itemNumber?: string;
		numberOfPatientsSeen?: string;
	}

	export interface BulkBillStoreForwardRequestType {
		claim: BulkBillClaimStoreForwardClaimType;
	}

	export interface BulkBillClaimStoreForwardClaimType {
		facilityId?: string;
		hospitalInd?: string;
		medicalEvent: Array<BBSMedicalEventType>;
		payeeProvider?: ProviderType;
		serviceProvider: ProviderType;
		serviceTypeCode: string;
	}

	export interface BBSMedicalEventType {
		id: string;
		authorisationDate: Date;
		createDateTime: Date;
		medicalEventDate: Date;
		medicalEventTime?: string;
		patient: MedicarePatientType;
		referral?: ReferralType;
		referralOverrideCode?: string;
		service: Array<ServiceType>;
		submissionAuthorityInd: string;
	}

	export interface MedicarePatientType {
		identity: IdentityType;
		medicare: MembershipType;
	}

	export interface ReferralType {
		issueDate: Date;
		period?: string;
		periodCode?: string;
		provider: ProviderType;
		typeCode: string;
	}

	export interface ServiceType {
		id: string;
		accessionDateTime?: Date;
		aftercareOverrideInd?: string;
		chargeAmount?: string;
		collectionDateTime?: Date;
		duplicateServiceOverrideInd?: string;
		fieldQuantity?: string;
		itemNumber?: string;
		lspNumber?: string;
		multipleProcedureOverrideInd?: string;
		numberOfPatientsSeen?: string;
		restrictiveOverrideCode?: string;
		rule3ExemptInd?: string;
		s4b3ExemptInd?: string;
		scpId?: string;
		selfDeemedCode?: string;
		text?: string;
		timeDuration?: string;
	}

	export interface BulkBillStoreForwardResponseType {
		claimId: string;
		status: string;
	}

	export interface AlliedHealthClaimRequestType {
		claim: VAAClaimType;
	}

	export interface VAAClaimType {
		hospitalInd?: string;
		medicalEvent: Array<VAAMedicalEventType>;
		payeeProvider?: ProviderType;
		serviceProvider: ProviderType;
		serviceTypeCode: string;
	}

	export interface VAAMedicalEventType {
		id: string;
		acceptedDisability?: AcceptedDisabilityType;
		authorisationDate: Date;
		breakInEpisodeEndDate?: Date;
		breakInEpisodeOfCareNumber?: string;
		breakInEpisodeStartDate?: Date;
		numberOfCNCHours?: string;
		numberOfCNCVisits?: string;
		createDateTime: Date;
		numberOfENHours?: string;
		numberOfENVisits?: string;
		facilityId?: string;
		medicalEventDate: Date;
		medicalEventTime?: string;
		numberOfNSSHours?: string;
		numberOfNSSVisits?: string;
		patient: VeteranPatientType;
		referral?: ReferralType;
		referralOverrideCode?: string;
		numberOfRNHours?: string;
		numberOfRNVisits?: string;
		service: Array<VAAServiceType>;
		submissionAuthorityInd: string;
	}

	export interface AcceptedDisabilityType {
		code: string;
		ind: string;
	}

	export interface VAAServiceType {
		id: string;
		accountReferenceNumber?: string;
		admissionDate?: Date;
		chargeAmount?: string;
		dischargeDate?: Date;
		distanceKilometres?: number;
		duplicateServiceOverrideInd?: string;
		itemNumber: string;
		multipleProcedureOverrideInd?: string;
		numberOfPatientsSeen?: string;
		numberOfTeeth?: string;
		opticalScriptCode?: string;
		restrictiveOverrideCode?: string;
		secondDeviceInd?: string;
		selfDeemedCode?: string;
		text?: string;
		timeDuration?: string;
		toothNumber?: string;
		upperLowerJawCode?: string;
	}

	export interface VeteranPatientType extends PatientType {
		veteranMembership?: VeteranMembershipType;
	}

	export interface VeteranMembershipType {
		veteranNumber: string;
	}

	export interface PatientType {
		identity: IdentityType;
		residentialAddress?: AddressType;
	}

	export interface AddressType {
		addressLineOne?: string;
		addressLineTwo?: string;
		locality?: string;
		postcode?: string;
	}

	export interface AlliedHealthClaimResponseType {
		claimId: string;
		status: string;
	}

	export interface DVAClaimRequestType {
		claim: DVAClaimType;
	}

	export interface DVAClaimType {
		hospitalInd?: string;
		serviceTypeCode: string;
		medicalEvent: Array<DVAMedicalEventType>;
		serviceProvider: ProviderType;
		payeeProvider?: ProviderType;
	}

	export interface DVAMedicalEventType {
		id: string;
		authorisationDate: Date;
		createDateTime: Date;
		facilityId?: string;
		medicalEventDate: Date;
		medicalEventTime?: string;
		referralOverrideCode?: string;
		submissionAuthorityInd: string;
		treatmentLocationCode?: string;
		acceptedDisability?: AcceptedDisabilityType;
		referral?: ReferralType;
		patient: VeteranPatientType;
		service: Array<DVAServiceType>;
	}

	export interface DVAServiceType extends ServiceType {
		accountReferenceNumber?: string;
		distanceKilometres?: number;
	}

	export interface DVAClaimResponseType {
		claimId: string;
		status: string;
	}

	export interface DVAReportRequestType {
		payeeProvider: ProviderType;
		claimId?: string;
		lodgementDate?: Date;
	}

	export interface DVAPaymentReportResponseType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;
		claimSummary?: Array<ClaimSummaryType>;
		status: string;
	}

	export interface DVAProcessingReportResponseType {
		claimAssessment?: DVAClaimAssessmentType;
		status: string;
	}

	export interface DVAClaimAssessmentType {
		medicalEvent?: Array<DVAMedicalEventAssessmentType>;
		serviceProvider?: ProviderType;
		benefitPaid?: string;
		chargeAmount?: string;
		claimId?: string;
	}

	export interface DVAMedicalEventAssessmentType {
		patient?: VeteranMembershipStatusType;
		service?: Array<DVAServiceAssessmentType>;
		id?: string;
		eventDate?: Date;
	}

	export interface VeteranMembershipStatusType {
		currentMembership?: VeteranMembershipResponseType;
		currentMember?: IdentityType;
		status?: StatusType;
		processDate?: Date;
	}

	export interface DVAServiceAssessmentType {
		id?: string;
		accountReferenceNumber?: string;
		assessmentCode?: string;
		benefitPaid?: string;
		chargeAmount?: string;
		gstInd?: string;
		itemNumber?: string;
		numberOfPatientsSeen?: string;
	}

	export interface VeteranMembershipResponseType extends VeteranMembershipType {
		entitlementCode?: string;
	}

	export interface EnterpriseConcessionVerificationRequestType {
		timeout?: number;
		concessionVerificationRequest: Array<ReferenceConcessionVerificationRequestType>;
	}

	export interface ReferenceConcessionVerificationRequestType extends ConcessionVerificationRequestType {
		id: string;
	}

	export interface ConcessionVerificationRequestType {
		patient: MedicarePatientType;
		dateOfService?: Date;
	}

	export interface EnterpriseConcessionVerificationResponseType {
		status: string;
		concessionVerificationResponse?: Array<ReferenceConcessionVerificationResponseType>;
	}

	export interface ReferenceConcessionVerificationResponseType extends ConcessionVerificationResponseType {
		id: string;
	}

	export interface ConcessionVerificationResponseType {
		medicareStatus: MembershipStatusType;
		concessionStatus: ConcessionStatusType;
	}

	export interface ConcessionStatusType {
		status?: StatusType;
		processDate?: Date;
	}

	export interface EnterprisePatientVerificationRequestType {
		timeout?: number;
		patientVerificationRequest: Array<ReferencePatientVerificationRequestType>;
	}

	export interface ReferencePatientVerificationRequestType extends PatientVerificationRequestType {
		id: string;
	}

	export interface PatientVerificationRequestType {
		patient: FundPatientType;
		provider?: ProviderType;
		dateOfService?: Date;
		typeCode: string;
	}

	export interface FundPatientType extends PatientType {
		alsoKnownAs?: IdentityType;
		medicare?: MembershipType;
		healthFund?: FundMembershipType;
	}

	export interface FundMembershipType {
		memberNumber?: string;
		memberRefNumber?: string;
		organisation?: string;
	}

	export interface EnterprisePatientVerificationResponseType {
		status: string;
		patientVerificationResponse?: Array<ReferencePatientVerificationResponseType>;
	}

	export interface ReferencePatientVerificationResponseType extends PatientVerificationResponseType {
		id: string;
	}

	export interface PatientVerificationResponseType {
		medicareStatus?: MembershipStatusType;
		healthFundStatus?: FundMembershipStatusType;
	}

	export interface FundMembershipStatusType {
		status?: StatusType;
		currentMembership?: FundMembershipType;
		currentMember?: IdentityType;
		processDate?: Date;
	}

	export interface EnterpriseVeteranVerificationRequestType {
		timeout?: number;
		veteranVerificationRequest: Array<ReferenceVeteranVerificationRequestType>;
	}

	export interface ReferenceVeteranVerificationRequestType extends VeteranVerificationRequestType {
		id: string;
	}

	export interface VeteranVerificationRequestType {
		patient: VeteranPatientType;
	}

	export interface EnterpriseVeteranVerificationResponseType {
		status: string;
		veteranVerificationResponse?: Array<ReferenceVeteranVerificationResponseType>;
	}

	export interface ReferenceVeteranVerificationResponseType extends VeteranVerificationResponseType {
		id?: string;
	}

	export interface VeteranVerificationResponseType {
		veteranStatus?: VeteranMembershipStatusType;
	}

	export interface PatientClaimInteractiveRequestType {
		patientClaimInteractive: PatientClaimInteractiveType;
	}

	export interface PatientClaimInteractiveType {
		patient: MedicarePatientType;
		referral?: ReferralType;
		claimant: ClaimantType;
		medicalEvent: Array<PCIMedicalEventType>;
		payeeProvider?: ProviderType;
		serviceProvider: ProviderType;
		referralOverrideCode?: string;
		accountPaidInd: string;
		accountReferenceId?: string;
		submissionAuthorityInd: string;
		authorisationDate: Date;
	}

	export interface PCIMedicalEventType {
		service: Array<PCIServiceType>;
		id: string;
		medicalEventDate: Date;
		medicalEventTime?: string;
	}

	export interface PCIServiceType extends ServiceType {
		patientContribAmount?: string;
		facilityId?: string;
		hospitalInd?: string;
	}

	export interface ClaimantType extends MedicarePatientType {
		eftDetails?: BankAccountType;
		residentialAddress?: AddressType;
		contactDetails?: ContactType;
	}

	export interface ContactType {
		emailAddress?: string;
		name?: string;
		phoneNumber?: string;
	}

	export interface PatientClaimInteractiveResponseType {
		claimAssessment: PCIAssessmentType;
		status: string;
	}

	export interface PCIAssessmentType {
		claimant?: CurrentMembershipType;
		patient?: CurrentMembershipType;
		medicalEvent?: Array<PCIMedicalEventResponseType>;
		error?: StatusType;
		claimId: string;
	}

	export interface CurrentMembershipType {
		currentMembership: MembershipType;
	}

	export interface PCIMedicalEventResponseType {
		service?: Array<ServiceResponseType>;
		eventDate?: Date;
		id?: string;
	}

	export interface RetrieveReportRequestType {
		transactionId: Array<string>;
	}

	export interface RetrieveReportResponseType {
		content?: Array<ContentType>;
	}

	export interface ContentType {
		transactionId?: string;
		status?: string;
	}

	export interface EnterpriseConcessionVerificationReportContentType extends ContentType {
		report?: EnterpriseConcessionVerificationResponseType;
	}

	export interface EnterprisePatientVerificationReportContentType extends ContentType {
		report?: EnterprisePatientVerificationResponseType;
	}

	export interface EnterpriseVeteranVerificationReportContentType extends ContentType {
		report?: EnterpriseVeteranVerificationResponseType;
	}

	export interface SameDayDeleteRequestType {
		sameDayDelete: SameDayDeleteType;
	}

	export interface SameDayDeleteType {
		patient: MedicarePatientType;
		reasonCode: string;
	}

	export interface SameDayDeleteResponseType {
		status: string;
	}

	export interface StatusReportRequestType {
		transactionId?: Array<string>;
		associateName?: string;
		fromDateTime?: Date;
		toDateTime?: Date;
		reportStatus?: string;
		requestTransmissionType?: string;
		status?: string;
	}

	export interface StatusReportResponseType {
		transactionStatus?: Array<TransactionStatusType>;
		status: string;
	}

	export interface TransactionStatusType {
		associateName?: string;
		lodgementDateTime?: Date;
		processStatus?: string;
		reference?: string;
		reportStatus?: string;
		requestTransmissionType?: string;
		transactionId?: string;
	}

	export interface BulkBillEasyclaimIntegratedReportRequestType {
		payeeProvider: ProviderType;
		transactionId: Array<string>;
	}

	export interface BulkBillEasyclaimIntegratedReportResponseType {
		report: Array<BulkBillEasyclaimReportType>;
	}

	export interface BulkBillEasyclaimReportType {
		transactionId: string;
		status: string;
		claimId?: string;
		dateOfLodgement?: Date;
		benefitPaid?: string;
		chargeAmount?: string;
		payeeProvider?: ProviderType;
		processingReport?: BbeProcessingReportType;
		paymentReport?: BbePaymentReportType;
	}

	export interface BbeProcessingReportType {
		patient?: MembershipStatusType;
		serviceProvider?: ProviderType;
		service?: Array<BbeServiceReportType>;
	}

	export interface BbeServiceReportType extends ServiceResponseType {
		dateOfService?: Date;
	}

	export interface BbePaymentReportType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;
	}

	@Injectable()
	export class MyClient {
		constructor(@Inject('baseUri') private baseUri: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/', private http: HttpClient) {
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillpaymentreport/v1
		 * @return {BBSPaymentReportResponseType} successful operation
		 */
		McpBulkBillPaymentReport1Eigw(requestBody: BBSReportRequestType, headersHandler?: () => HttpHeaders): Observable<BBSPaymentReportResponseType> {
			return this.http.post<BBSPaymentReportResponseType>(this.baseUri + 'mcp/bulkbillpaymentreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillprocessingreport/v1
		 * @return {BBSProcessingReportResponseType} successful operation
		 */
		McpBulkBillProcessingReport1Eigw(requestBody: BBSReportRequestType, headersHandler?: () => HttpHeaders): Observable<BBSProcessingReportResponseType> {
			return this.http.post<BBSProcessingReportResponseType>(this.baseUri + 'mcp/bulkbillprocessingreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillstoreforward/general/v1
		 * @return {BulkBillStoreForwardResponseType} successful operation
		 */
		McpBulkBillStoreForwardGeneral1Eigw(requestBody: BulkBillStoreForwardRequestType, headersHandler?: () => HttpHeaders): Observable<BulkBillStoreForwardResponseType> {
			return this.http.post<BulkBillStoreForwardResponseType>(this.baseUri + 'mcp/bulkbillstoreforward/general/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillstoreforward/pathology/v1
		 * @return {BulkBillStoreForwardResponseType} successful operation
		 */
		McpBulkBillStoreForwardPathology1Eigw(requestBody: BulkBillStoreForwardRequestType, headersHandler?: () => HttpHeaders): Observable<BulkBillStoreForwardResponseType> {
			return this.http.post<BulkBillStoreForwardResponseType>(this.baseUri + 'mcp/bulkbillstoreforward/pathology/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillstoreforward/specialist/v1
		 * @return {BulkBillStoreForwardResponseType} successful operation
		 */
		McpBulkBillStoreForwardSpecialist1Eigw(requestBody: BulkBillStoreForwardRequestType, headersHandler?: () => HttpHeaders): Observable<BulkBillStoreForwardResponseType> {
			return this.http.post<BulkBillStoreForwardResponseType>(this.baseUri + 'mcp/bulkbillstoreforward/specialist/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/allied/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthAllied1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/allied/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/communitynursing/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthCommunityNursing1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/communitynursing/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/dental/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthDental1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/dental/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/optical/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthOptical1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/optical/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/psych/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthPsych1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/psych/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaalliedhealth/speechpathology/v1
		 * @return {AlliedHealthClaimResponseType} successful operation
		 */
		McpDvaAlliedHealthSpeechPathology1Eigw(requestBody: AlliedHealthClaimRequestType, headersHandler?: () => HttpHeaders): Observable<AlliedHealthClaimResponseType> {
			return this.http.post<AlliedHealthClaimResponseType>(this.baseUri + 'mcp/dvaalliedhealth/speechpathology/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaclaim/general/v1
		 * @return {DVAClaimResponseType} successful operation
		 */
		McpDvaClaimGeneral1Eigw(requestBody: DVAClaimRequestType, headersHandler?: () => HttpHeaders): Observable<DVAClaimResponseType> {
			return this.http.post<DVAClaimResponseType>(this.baseUri + 'mcp/dvaclaim/general/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaclaim/pathology/v1
		 * @return {DVAClaimResponseType} successful operation
		 */
		McpDvaClaimPathology1Eigw(requestBody: DVAClaimRequestType, headersHandler?: () => HttpHeaders): Observable<DVAClaimResponseType> {
			return this.http.post<DVAClaimResponseType>(this.baseUri + 'mcp/dvaclaim/pathology/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaclaim/specialist/v1
		 * @return {DVAClaimResponseType} successful operation
		 */
		McpDvaClaimSpecialist1Eigw(requestBody: DVAClaimRequestType, headersHandler?: () => HttpHeaders): Observable<DVAClaimResponseType> {
			return this.http.post<DVAClaimResponseType>(this.baseUri + 'mcp/dvaclaim/specialist/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvapaymentreport/v1
		 * @return {DVAPaymentReportResponseType} successful operation
		 */
		McpDvaPaymentReport1Eigw(requestBody: DVAReportRequestType, headersHandler?: () => HttpHeaders): Observable<DVAPaymentReportResponseType> {
			return this.http.post<DVAPaymentReportResponseType>(this.baseUri + 'mcp/dvapaymentreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/dvaprocessingreport/v1
		 * @return {DVAProcessingReportResponseType} successful operation
		 */
		McpDvaProcessingReport1Eigw(requestBody: DVAReportRequestType, headersHandler?: () => HttpHeaders): Observable<DVAProcessingReportResponseType> {
			return this.http.post<DVAProcessingReportResponseType>(this.baseUri + 'mcp/dvaprocessingreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterpriseconcessionverification/v1
		 * @return {EnterpriseConcessionVerificationResponseType} successful operation
		 */
		McpEnterpriseConcessionVerification1Eigw(requestBody: EnterpriseConcessionVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<EnterpriseConcessionVerificationResponseType> {
			return this.http.post<EnterpriseConcessionVerificationResponseType>(this.baseUri + 'mcp/enterpriseconcessionverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterprisepatientverification/v1
		 * @return {EnterprisePatientVerificationResponseType} successful operation
		 */
		McpEnterprisePatientVerification1Eigw(requestBody: EnterprisePatientVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<EnterprisePatientVerificationResponseType> {
			return this.http.post<EnterprisePatientVerificationResponseType>(this.baseUri + 'mcp/enterprisepatientverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterpriseveteranverification/v1
		 * @return {EnterpriseVeteranVerificationResponseType} successful operation
		 */
		McpEnterpriseVeteranVerification1Eigw(requestBody: EnterpriseVeteranVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<EnterpriseVeteranVerificationResponseType> {
			return this.http.post<EnterpriseVeteranVerificationResponseType>(this.baseUri + 'mcp/enterpriseveteranverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientclaiminteractive/general/v1
		 * @return {PatientClaimInteractiveResponseType} successful operation
		 */
		McpPatientClaimInteractiveGeneral1Eigw(requestBody: PatientClaimInteractiveRequestType, headersHandler?: () => HttpHeaders): Observable<PatientClaimInteractiveResponseType> {
			return this.http.post<PatientClaimInteractiveResponseType>(this.baseUri + 'mcp/patientclaiminteractive/general/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientclaiminteractive/pathology/v1
		 * @return {PatientClaimInteractiveResponseType} successful operation
		 */
		McpPatientClaimInteractivePathology1Eigw(requestBody: PatientClaimInteractiveRequestType, headersHandler?: () => HttpHeaders): Observable<PatientClaimInteractiveResponseType> {
			return this.http.post<PatientClaimInteractiveResponseType>(this.baseUri + 'mcp/patientclaiminteractive/pathology/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientclaiminteractive/specialist/v1
		 * @return {PatientClaimInteractiveResponseType} successful operation
		 */
		McpPatientClaimInteractiveSpecialist1Eigw(requestBody: PatientClaimInteractiveRequestType, headersHandler?: () => HttpHeaders): Observable<PatientClaimInteractiveResponseType> {
			return this.http.post<PatientClaimInteractiveResponseType>(this.baseUri + 'mcp/patientclaiminteractive/specialist/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientverification/v1
		 * @return {PatientVerificationResponseType} successful operation
		 */
		McpPatientVerification1Eigw(requestBody: PatientVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<PatientVerificationResponseType> {
			return this.http.post<PatientVerificationResponseType>(this.baseUri + 'mcp/patientverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientverification/hf/v1
		 * @return {PatientVerificationResponseType} successful operation
		 */
		McpPatientVerificationHf1Eigw(requestBody: PatientVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<PatientVerificationResponseType> {
			return this.http.post<PatientVerificationResponseType>(this.baseUri + 'mcp/patientverification/hf/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/patientverification/medicare/v1
		 * @return {PatientVerificationResponseType} successful operation
		 */
		McpPatientVerificationMedicare1Eigw(requestBody: PatientVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<PatientVerificationResponseType> {
			return this.http.post<PatientVerificationResponseType>(this.baseUri + 'mcp/patientverification/medicare/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterpriseconcessionverification/retrievereport/v1
		 * @return {RetrieveReportResponseType} successful operation
		 */
		McpRetrieveReportEcv1Eigw(requestBody: RetrieveReportRequestType, headersHandler?: () => HttpHeaders): Observable<RetrieveReportResponseType> {
			return this.http.post<RetrieveReportResponseType>(this.baseUri + 'mcp/enterpriseconcessionverification/retrievereport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterprisepatientverification/retrievereport/v1
		 * @return {RetrieveReportResponseType} successful operation
		 */
		McpRetrieveReportEpv1Eigw(requestBody: RetrieveReportRequestType, headersHandler?: () => HttpHeaders): Observable<RetrieveReportResponseType> {
			return this.http.post<RetrieveReportResponseType>(this.baseUri + 'mcp/enterprisepatientverification/retrievereport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/enterpriseveteranverification/retrievereport/v1
		 * @return {RetrieveReportResponseType} successful operation
		 */
		McpRetrieveReportEvv1Eigw(requestBody: RetrieveReportRequestType, headersHandler?: () => HttpHeaders): Observable<RetrieveReportResponseType> {
			return this.http.post<RetrieveReportResponseType>(this.baseUri + 'mcp/enterpriseveteranverification/retrievereport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/samedaydelete/v1
		 * @return {SameDayDeleteResponseType} successful operation
		 */
		McpSameDayDelete1Eigw(requestBody: SameDayDeleteRequestType, headersHandler?: () => HttpHeaders): Observable<SameDayDeleteResponseType> {
			return this.http.post<SameDayDeleteResponseType>(this.baseUri + 'mcp/samedaydelete/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/statusreport/v1
		 * @return {StatusReportResponseType} successful operation
		 */
		McpStatusReport1Eigw(requestBody: StatusReportRequestType, headersHandler?: () => HttpHeaders): Observable<StatusReportResponseType> {
			return this.http.post<StatusReportResponseType>(this.baseUri + 'mcp/statusreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/veteranverification/v1
		 * @return {VeteranVerificationResponseType} successful operation
		 */
		McpVeteranVerification1Eigw(requestBody: VeteranVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<VeteranVerificationResponseType> {
			return this.http.post<VeteranVerificationResponseType>(this.baseUri + 'mcp/veteranverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/concessionverification/v1
		 * @return {ConcessionVerificationResponseType} successful operation
		 */
		McpConcessionVerification1Eigw(requestBody: ConcessionVerificationRequestType, headersHandler?: () => HttpHeaders): Observable<ConcessionVerificationResponseType> {
			return this.http.post<ConcessionVerificationResponseType>(this.baseUri + 'mcp/concessionverification/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}

		/**
		 * This is the request
		 * Post mcp/bulkbillintegratedreport/v1
		 * @return {BulkBillEasyclaimIntegratedReportResponseType} successful operation
		 */
		McpBulkBillIntegratedReport1Eigw(requestBody: BulkBillEasyclaimIntegratedReportRequestType, headersHandler?: () => HttpHeaders): Observable<BulkBillEasyclaimIntegratedReportResponseType> {
			return this.http.post<BulkBillEasyclaimIntegratedReportResponseType>(this.baseUri + 'mcp/bulkbillintegratedreport/v1', JSON.stringify(requestBody), { headers: headersHandler ? headersHandler().append('Content-Type', 'application/json;charset=UTF-8') : new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) });
		}
	}

}

