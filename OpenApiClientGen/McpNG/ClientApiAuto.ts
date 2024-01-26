import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
export namespace APS_Mcp_Proxy {
	export interface BBSReportRequestType {

		/** Required */
		payeeProvider: ProviderType;

		/**
		 * Max length: 6
		 * Min length: 6
		 */
		claimId?: string | null;
		lodgementDate?: Date | null;
	}

	export interface ProviderType {

		/**
		 * Required
		 * Max length: 8
		 * Min length: 8
		 */
		providerNumber: string;
	}

	export interface BBSPaymentReportResponseType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;

		/** Minimum items: 1 */
		claimSummary?: Array<ClaimSummaryType>;

		/** Required */
		status: string;
	}

	export interface PaymentRunType {
		payerName?: string | null;
		runDate?: Date | null;
		runNumber?: string | null;
	}

	export interface PaymentType {

		/** Required */
		accountInfo: BankAccountType;
		depositAmount?: string | null;
		paymentReference?: string | null;
	}

	export interface BankAccountType {

		/**
		 * Max length: 30
		 * Min length: 1
		 */
		accountName?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		accountNumber?: string | null;

		/**
		 * Max length: 6
		 * Min length: 6
		 */
		bsbCode?: string | null;
	}

	export interface ClaimSummaryType {
		accountReferenceId?: string | null;
		benefit?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		claimChannelCode?: string | null;
		claimId?: string | null;
		lodgementDate?: Date | null;
		transactionId?: string | null;
	}

	export interface ServiceMessagesType {

		/** Required */
		highestSeverity: ServiceMessagesTypeHighestSeverity;

		/**
		 * Required
		 * Minimum items: 1
		 */
		serviceMessage: Array<ServiceMessageType>;
	}

	export enum ServiceMessagesTypeHighestSeverity { Fatal = 'Fatal', Error = 'Error', Warning = 'Warning', Informational = 'Informational' }

	export interface ServiceMessageType {

		/** Required */
		code: string;

		/** Required */
		severity: ServiceMessagesTypeHighestSeverity;

		/** Required */
		reason: string;
	}

	export interface BBSProcessingReportResponseType {
		claimAssessment?: ClaimAssessmentType;

		/** Required */
		status: string;
	}

	export interface ClaimAssessmentType {

		/** Minimum items: 1 */
		medicalEvent?: Array<MedicalEventResponseType>;
		serviceProvider?: ProviderType;
		benefitPaid?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		claimId?: string | null;
	}

	export interface MedicalEventResponseType {
		patient?: MembershipStatusType;

		/** Minimum items: 1 */
		service?: Array<ServiceResponseType>;
		id?: string | null;
		eventDate?: Date | null;
	}

	export interface MembershipStatusType {
		status?: StatusType;
		currentMembership?: MembershipType;
		currentMember?: IdentityType;
		processDate?: Date | null;
	}

	export interface StatusType {
		code?: number | null;
		text?: string | null;
	}

	export interface MembershipType {

		/**
		 * Max length: 10
		 * Min length: 10
		 */
		memberNumber?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		memberRefNumber?: string | null;
	}

	export interface IdentityType {
		dateOfBirth?: Date | null;
		familyName?: string | null;
		givenName?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		secondInitial?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		sex?: string | null;
	}

	export interface ServiceResponseType {
		error?: StatusType;
		id?: string | null;
		assessmentCode?: string | null;
		benefitPaid?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		itemNumber?: string | null;
		numberOfPatientsSeen?: string | null;
	}

	export interface BulkBillStoreForwardRequestType {

		/** Required */
		claim: BulkBillClaimStoreForwardClaimType;
	}

	export interface BulkBillClaimStoreForwardClaimType {

		/**
		 * Max length: 8
		 * Min length: 8
		 */
		facilityId?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		hospitalInd?: string | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		medicalEvent: Array<BBSMedicalEventType>;
		payeeProvider?: ProviderType;

		/** Required */
		serviceProvider: ProviderType;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		serviceTypeCode: string;
	}

	export interface BBSMedicalEventType {

		/**
		 * Required
		 * Max length: 2
		 * Min length: 2
		 */
		id: string;

		/** Required */
		authorisationDate: Date;

		/** Required */
		createDateTime: Date;

		/** Required */
		medicalEventDate: Date;
		medicalEventTime?: string | null;

		/** Required */
		patient: MedicarePatientType;
		referral?: ReferralType;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		referralOverrideCode?: string | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		service: Array<ServiceType>;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		submissionAuthorityInd: string;
	}

	export interface MedicarePatientType {

		/** Required */
		identity: IdentityType;

		/** Required */
		medicare: MembershipType;
	}

	export interface ReferralType {

		/** Required */
		issueDate: Date;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		period?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		periodCode?: string | null;

		/** Required */
		provider: ProviderType;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		typeCode: string;
	}

	export interface ServiceType {

		/**
		 * Required
		 * Max length: 4
		 * Min length: 4
		 */
		id: string;
		accessionDateTime?: Date | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		aftercareOverrideInd?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		collectionDateTime?: Date | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		duplicateServiceOverrideInd?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		fieldQuantity?: string | null;

		/**
		 * Max length: 5
		 * Min length: 1
		 */
		itemNumber?: string | null;

		/**
		 * Max length: 6
		 * Min length: 1
		 */
		lspNumber?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		multipleProcedureOverrideInd?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		numberOfPatientsSeen?: string | null;

		/**
		 * Max length: 2
		 * Min length: 2
		 */
		restrictiveOverrideCode?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		rule3ExemptInd?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		s4b3ExemptInd?: string | null;

		/**
		 * Max length: 5
		 * Min length: 3
		 */
		scpId?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		selfDeemedCode?: string | null;
		text?: string | null;

		/**
		 * Max length: 3
		 * Min length: 3
		 */
		timeDuration?: string | null;
	}

	export interface BulkBillStoreForwardResponseType {

		/** Required */
		claimId: string;

		/** Required */
		status: string;
	}

	export interface AlliedHealthClaimRequestType {

		/** Required */
		claim: VAAClaimType;
	}

	export interface VAAClaimType {

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		hospitalInd?: string | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		medicalEvent: Array<VAAMedicalEventType>;
		payeeProvider?: ProviderType;

		/** Required */
		serviceProvider: ProviderType;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		serviceTypeCode: string;
	}

	export interface VAAMedicalEventType {

		/**
		 * Required
		 * Max length: 2
		 * Min length: 2
		 */
		id: string;
		acceptedDisability?: AcceptedDisabilityType;

		/** Required */
		authorisationDate: Date;
		breakInEpisodeEndDate?: Date | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		breakInEpisodeOfCareNumber?: string | null;
		breakInEpisodeStartDate?: Date | null;

		/**
		 * Max length: 5
		 * Min length: 1
		 */
		numberOfCNCHours?: string | null;

		/**
		 * Max length: 3
		 * Min length: 1
		 */
		numberOfCNCVisits?: string | null;

		/** Required */
		createDateTime: Date;

		/**
		 * Max length: 5
		 * Min length: 1
		 */
		numberOfENHours?: string | null;

		/**
		 * Max length: 3
		 * Min length: 1
		 */
		numberOfENVisits?: string | null;

		/**
		 * Max length: 8
		 * Min length: 8
		 */
		facilityId?: string | null;

		/** Required */
		medicalEventDate: Date;
		medicalEventTime?: string | null;

		/**
		 * Max length: 5
		 * Min length: 1
		 */
		numberOfNSSHours?: string | null;

		/**
		 * Max length: 3
		 * Min length: 1
		 */
		numberOfNSSVisits?: string | null;

		/** Required */
		patient: VeteranPatientType;
		referral?: ReferralType;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		referralOverrideCode?: string | null;

		/**
		 * Max length: 5
		 * Min length: 1
		 */
		numberOfRNHours?: string | null;

		/**
		 * Max length: 3
		 * Min length: 1
		 */
		numberOfRNVisits?: string | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		service: Array<VAAServiceType>;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		submissionAuthorityInd: string;
	}

	export interface AcceptedDisabilityType {

		/** Required */
		code: string;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		ind: string;
	}

	export interface VAAServiceType {

		/**
		 * Required
		 * Max length: 4
		 * Min length: 4
		 */
		id: string;

		/**
		 * Max length: 8
		 * Min length: 1
		 */
		accountReferenceNumber?: string | null;
		admissionDate?: Date | null;

		/**
		 * Max length: 7
		 * Min length: 3
		 */
		chargeAmount?: string | null;
		dischargeDate?: Date | null;
		distanceKilometres?: number | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		duplicateServiceOverrideInd?: string | null;

		/**
		 * Required
		 * Max length: 5
		 * Min length: 1
		 */
		itemNumber: string;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		multipleProcedureOverrideInd?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		numberOfPatientsSeen?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		numberOfTeeth?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		opticalScriptCode?: string | null;

		/**
		 * Max length: 2
		 * Min length: 2
		 */
		restrictiveOverrideCode?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		secondDeviceInd?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		selfDeemedCode?: string | null;
		text?: string | null;

		/**
		 * Max length: 3
		 * Min length: 3
		 */
		timeDuration?: string | null;

		/**
		 * Max length: 2
		 * Min length: 2
		 */
		toothNumber?: string | null;

		/**
		 * Max length: 3
		 * Min length: 3
		 */
		upperLowerJawCode?: string | null;
	}

	export interface VeteranPatientType extends PatientType {
		veteranMembership?: VeteranMembershipType;
	}

	export interface VeteranMembershipType {

		/**
		 * Required
		 * Max length: 9
		 * Min length: 3
		 */
		veteranNumber: string;
	}

	export interface PatientType {

		/** Required */
		identity: IdentityType;
		residentialAddress?: AddressType;
	}

	export interface AddressType {

		/**
		 * Max length: 40
		 * Min length: 1
		 */
		addressLineOne?: string | null;

		/**
		 * Max length: 40
		 * Min length: 1
		 */
		addressLineTwo?: string | null;

		/**
		 * Max length: 40
		 * Min length: 1
		 */
		locality?: string | null;

		/**
		 * Max length: 4
		 * Min length: 4
		 */
		postcode?: string | null;
	}

	export interface AlliedHealthClaimResponseType {

		/** Required */
		claimId: string;

		/** Required */
		status: string;
	}

	export interface DVAClaimRequestType {

		/** Required */
		claim: DVAClaimType;
	}

	export interface DVAClaimType {

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		hospitalInd?: string | null;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		serviceTypeCode: string;

		/**
		 * Required
		 * Minimum items: 1
		 */
		medicalEvent: Array<DVAMedicalEventType>;

		/** Required */
		serviceProvider: ProviderType;
		payeeProvider?: ProviderType;
	}

	export interface DVAMedicalEventType {

		/**
		 * Required
		 * Max length: 2
		 * Min length: 2
		 */
		id: string;

		/** Required */
		authorisationDate: Date;

		/** Required */
		createDateTime: Date;

		/**
		 * Max length: 8
		 * Min length: 8
		 */
		facilityId?: string | null;

		/** Required */
		medicalEventDate: Date;
		medicalEventTime?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		referralOverrideCode?: string | null;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		submissionAuthorityInd: string;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		treatmentLocationCode?: string | null;
		acceptedDisability?: AcceptedDisabilityType;
		referral?: ReferralType;

		/** Required */
		patient: VeteranPatientType;

		/**
		 * Required
		 * Minimum items: 1
		 */
		service: Array<DVAServiceType>;
	}

	export interface DVAServiceType extends ServiceType {

		/**
		 * Max length: 8
		 * Min length: 1
		 */
		accountReferenceNumber?: string | null;
		distanceKilometres?: number | null;
	}

	export interface DVAClaimResponseType {

		/** Required */
		claimId: string;

		/** Required */
		status: string;
	}

	export interface DVAReportRequestType {

		/** Required */
		payeeProvider: ProviderType;

		/**
		 * Max length: 6
		 * Min length: 6
		 */
		claimId?: string | null;
		lodgementDate?: Date | null;
	}

	export interface DVAPaymentReportResponseType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;

		/** Minimum items: 1 */
		claimSummary?: Array<ClaimSummaryType>;

		/** Required */
		status: string;
	}

	export interface DVAProcessingReportResponseType {
		claimAssessment?: DVAClaimAssessmentType;

		/** Required */
		status: string;
	}

	export interface DVAClaimAssessmentType {

		/** Minimum items: 1 */
		medicalEvent?: Array<DVAMedicalEventAssessmentType>;
		serviceProvider?: ProviderType;
		benefitPaid?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		claimId?: string | null;
	}

	export interface DVAMedicalEventAssessmentType {
		patient?: VeteranMembershipStatusType;

		/** Minimum items: 1 */
		service?: Array<DVAServiceAssessmentType>;
		id?: string | null;
		eventDate?: Date | null;
	}

	export interface VeteranMembershipStatusType {
		currentMembership?: VeteranMembershipResponseType;
		currentMember?: IdentityType;
		status?: StatusType;
		processDate?: Date | null;
	}

	export interface DVAServiceAssessmentType {
		id?: string | null;
		accountReferenceNumber?: string | null;
		assessmentCode?: string | null;
		benefitPaid?: string | null;

		/**
		 * Max length: 9
		 * Min length: 1
		 */
		chargeAmount?: string | null;
		gstInd?: string | null;
		itemNumber?: string | null;
		numberOfPatientsSeen?: string | null;
	}

	export interface VeteranMembershipResponseType extends VeteranMembershipType {
		entitlementCode?: string | null;
	}

	export interface EnterpriseConcessionVerificationRequestType {
		timeout?: number | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		concessionVerificationRequest: Array<ReferenceConcessionVerificationRequestType>;
	}

	export interface ReferenceConcessionVerificationRequestType extends ConcessionVerificationRequestType {

		/** Required */
		id: string;
	}

	export interface ConcessionVerificationRequestType {

		/** Required */
		patient: MedicarePatientType;
		dateOfService?: Date | null;
	}

	export interface EnterpriseConcessionVerificationResponseType {

		/** Required */
		status: string;

		/** Minimum items: 1 */
		concessionVerificationResponse?: Array<ReferenceConcessionVerificationResponseType>;
	}

	export interface ReferenceConcessionVerificationResponseType extends ConcessionVerificationResponseType {

		/** Required */
		id: string;
	}

	export interface ConcessionVerificationResponseType {

		/** Required */
		medicareStatus: MembershipStatusType;

		/** Required */
		concessionStatus: ConcessionStatusType;
	}

	export interface ConcessionStatusType {
		status?: StatusType;
		processDate?: Date | null;
	}

	export interface EnterprisePatientVerificationRequestType {
		timeout?: number | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		patientVerificationRequest: Array<ReferencePatientVerificationRequestType>;
	}

	export interface ReferencePatientVerificationRequestType extends PatientVerificationRequestType {

		/** Required */
		id: string;
	}

	export interface PatientVerificationRequestType {

		/** Required */
		patient: FundPatientType;
		provider?: ProviderType;
		dateOfService?: Date | null;

		/**
		 * Required
		 * Max length: 3
		 * Min length: 3
		 */
		typeCode: string;
	}

	export interface FundPatientType extends PatientType {
		alsoKnownAs?: IdentityType;
		medicare?: MembershipType;
		healthFund?: FundMembershipType;
	}

	export interface FundMembershipType {

		/**
		 * Max length: 19
		 * Min length: 1
		 */
		memberNumber?: string | null;

		/**
		 * Max length: 2
		 * Min length: 1
		 */
		memberRefNumber?: string | null;

		/**
		 * Max length: 3
		 * Min length: 3
		 */
		organisation?: string | null;
	}

	export interface EnterprisePatientVerificationResponseType {

		/** Required */
		status: string;

		/** Minimum items: 1 */
		patientVerificationResponse?: Array<ReferencePatientVerificationResponseType>;
	}

	export interface ReferencePatientVerificationResponseType extends PatientVerificationResponseType {

		/** Required */
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
		processDate?: Date | null;
	}

	export interface EnterpriseVeteranVerificationRequestType {
		timeout?: number | null;

		/**
		 * Required
		 * Minimum items: 1
		 */
		veteranVerificationRequest: Array<ReferenceVeteranVerificationRequestType>;
	}

	export interface ReferenceVeteranVerificationRequestType extends VeteranVerificationRequestType {

		/** Required */
		id: string;
	}

	export interface VeteranVerificationRequestType {

		/** Required */
		patient: VeteranPatientType;
	}

	export interface EnterpriseVeteranVerificationResponseType {

		/** Required */
		status: string;

		/** Minimum items: 1 */
		veteranVerificationResponse?: Array<ReferenceVeteranVerificationResponseType>;
	}

	export interface ReferenceVeteranVerificationResponseType extends VeteranVerificationResponseType {
		id?: string | null;
	}

	export interface VeteranVerificationResponseType {
		veteranStatus?: VeteranMembershipStatusType;
	}

	export interface PatientClaimInteractiveRequestType {

		/** Required */
		patientClaimInteractive: PatientClaimInteractiveType;
	}

	export interface PatientClaimInteractiveType {

		/** Required */
		patient: MedicarePatientType;
		referral?: ReferralType;

		/** Required */
		claimant: ClaimantType;

		/**
		 * Required
		 * Minimum items: 1
		 */
		medicalEvent: Array<PCIMedicalEventType>;
		payeeProvider?: ProviderType;

		/** Required */
		serviceProvider: ProviderType;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		referralOverrideCode?: string | null;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		accountPaidInd: string;
		accountReferenceId?: string | null;

		/**
		 * Required
		 * Max length: 1
		 * Min length: 1
		 */
		submissionAuthorityInd: string;

		/** Required */
		authorisationDate: Date;
	}

	export interface PCIMedicalEventType {

		/**
		 * Required
		 * Minimum items: 1
		 */
		service: Array<PCIServiceType>;

		/**
		 * Required
		 * Max length: 2
		 * Min length: 2
		 */
		id: string;

		/** Required */
		medicalEventDate: Date;
		medicalEventTime?: string | null;
	}

	export interface PCIServiceType extends ServiceType {

		/**
		 * Max length: 7
		 * Min length: 3
		 */
		patientContribAmount?: string | null;

		/**
		 * Max length: 8
		 * Min length: 8
		 */
		facilityId?: string | null;

		/**
		 * Max length: 1
		 * Min length: 1
		 */
		hospitalInd?: string | null;
	}

	export interface ClaimantType extends MedicarePatientType {
		eftDetails?: BankAccountType;
		residentialAddress?: AddressType;
		contactDetails?: ContactType;
	}

	export interface ContactType {

		/**
		 * Max length: 128
		 * Min length: 5
		 */
		emailAddress?: string | null;
		name?: string | null;

		/**
		 * Max length: 19
		 * Min length: 8
		 */
		phoneNumber?: string | null;
	}

	export interface PatientClaimInteractiveResponseType {

		/** Required */
		claimAssessment: PCIAssessmentType;

		/** Required */
		status: string;
	}

	export interface PCIAssessmentType {
		claimant?: CurrentMembershipType;
		patient?: CurrentMembershipType;

		/** Minimum items: 1 */
		medicalEvent?: Array<PCIMedicalEventResponseType>;
		error?: StatusType;

		/** Required */
		claimId: string;
	}

	export interface CurrentMembershipType {

		/** Required */
		currentMembership: MembershipType;
	}

	export interface PCIMedicalEventResponseType {

		/** Minimum items: 1 */
		service?: Array<ServiceResponseType>;
		eventDate?: Date | null;
		id?: string | null;
	}

	export interface RetrieveReportRequestType {

		/**
		 * Required
		 * Minimum items: 1
		 */
		transactionId: Array<string>;
	}

	export interface RetrieveReportResponseType {

		/** Minimum items: 1 */
		content?: Array<ContentType>;
	}

	export interface ContentType {
		transactionId?: string | null;
		status?: string | null;
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

		/** Required */
		sameDayDelete: SameDayDeleteType;
	}

	export interface SameDayDeleteType {

		/** Required */
		patient: MedicarePatientType;

		/**
		 * Required
		 * Max length: 3
		 * Min length: 3
		 */
		reasonCode: string;
	}

	export interface SameDayDeleteResponseType {

		/** Required */
		status: string;
	}

	export interface StatusReportRequestType {

		/** Minimum items: 1 */
		transactionId?: Array<string>;
		associateName?: string | null;
		fromDateTime?: Date | null;
		toDateTime?: Date | null;
		reportStatus?: string | null;
		requestTransmissionType?: string | null;
		status?: string | null;
	}

	export interface StatusReportResponseType {

		/** Minimum items: 1 */
		transactionStatus?: Array<TransactionStatusType>;

		/** Required */
		status: string;
	}

	export interface TransactionStatusType {
		associateName?: string | null;
		lodgementDateTime?: Date | null;
		processStatus?: string | null;
		reference?: string | null;
		reportStatus?: string | null;
		requestTransmissionType?: string | null;
		transactionId?: string | null;
	}

	export interface BulkBillEasyclaimIntegratedReportRequestType {

		/** Required */
		payeeProvider: ProviderType;

		/**
		 * Required
		 * Minimum items: 1
		 */
		transactionId: Array<string>;
	}

	export interface BulkBillEasyclaimIntegratedReportResponseType {

		/**
		 * Required
		 * Minimum items: 1
		 */
		report: Array<BulkBillEasyclaimReportType>;
	}

	export interface BulkBillEasyclaimReportType {

		/** Required */
		transactionId: string;

		/** Required */
		status: string;
		claimId?: string | null;
		dateOfLodgement?: Date | null;
		benefitPaid?: string | null;
		chargeAmount?: string | null;
		payeeProvider?: ProviderType;
		processingReport?: BbeProcessingReportType;
		paymentReport?: BbePaymentReportType;
	}

	export interface BbeProcessingReportType {
		patient?: MembershipStatusType;
		serviceProvider?: ProviderType;

		/** Minimum items: 1 */
		service?: Array<BbeServiceReportType>;
	}

	export interface BbeServiceReportType extends ServiceResponseType {
		dateOfService?: Date | null;
	}

	export interface BbePaymentReportType {
		paymentRun?: PaymentRunType;
		paymentInfo?: PaymentType;
	}

	@Injectable()
	export class McpClient {
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

