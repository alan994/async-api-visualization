import { defineInjectable, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MergerService {

    constructor() { }

    private asyncApiRawData: any[] = [
        { "asyncapi": "2.2.0", "info": { "title": "Services.Conversation.ConversationAnalytics", "version": "1.0.0" }, "servers": { "nats": { "url": "nats.io", "protocol": "nats" } }, "defaultContentType": "application/json", "channels": { "v1.general.sync.candidate": { "subscribe": { "operationId": "CandidateUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/candidateUpdatedEvent" } } }, "v1.general.sync.company": { "subscribe": { "operationId": "CompanyUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/companyUpdatedEvent" } } }, "v1.conversation.batch.prepare-failed": { "subscribe": { "operationId": "MessageBatchPreparedFailedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/messageBatchPreparedFailedEvent" } } }, "v1.conversation.message.sent": { "subscribe": { "operationId": "MessageSentEventHandler", "summary": "", "message": { "$ref": "#/components/messages/messageSentEvent" } } }, "v1.conversation.message.updated": { "subscribe": { "operationId": "MessageUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/messageUpdatedEvent" } } }, "v1.conversation.message.send-failed": { "subscribe": { "operationId": "SendingMessageFailedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/sendingMessageFailedEvent" } } }, "v1.conversation.messages.send": { "subscribe": { "operationId": "SendMessageRequestedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/sendMessageRequestedEvent" } } }, "v1.general.sync.user": { "subscribe": { "operationId": "UserUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/userUpdatedEvent" } } } }, "components": { "schemas": { "candidateUpdatedEvent": { "id": "candidateUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "candidate": { "$ref": "#/components/schemas/updatedCandidate" } } }] }, "updatedCandidate": { "id": "updatedCandidate", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "email": { "type": ["null", "string"] }, "phone": { "type": ["null", "string"] }, "firstName": { "type": "string" }, "lastName": { "type": ["null", "string"] }, "currentJobTitle": { "type": ["null", "string"] }, "currentCompany": { "type": ["null", "string"] }, "salutation": { "oneOf": [{ "type": "null" }, { "$ref": "#/components/schemas/salutationTypes" }] }, "preferredLanguage": { "type": ["null", "string"] }, "portalLoginUrl": { "type": "string" }, "portalConsentUrl": { "type": "string" }, "isUnsubscribed": { "type": "boolean" }, "unsubscribedAt": { "type": ["null", "string"], "format": "date-time" }, "isUnsubscribedOneOnOne": { "type": "boolean" }, "unsubscribedOneOnOneAt": { "type": ["null", "string"], "format": "date-time" } } }, "salutationTypes": { "id": "salutationTypes", "type": "integer", "description": "", "x-enumNames": ["Other", "Mr", "Mrs", "Miss"], "enum": [0, 1, 2, 3] }, "eventBase": { "id": "eventBase", "type": "object", "x-abstract": true, "additionalProperties": false, "properties": { "timeStamp": { "type": "string", "format": "date-time" } } }, "companyUpdatedEvent": { "id": "companyUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "company": { "$ref": "#/components/schemas/updatedCompany" } } }] }, "updatedCompany": { "id": "updatedCompany", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "name": { "type": "string" }, "website": { "type": ["null", "string"] }, "careerPageUrl": { "type": "string" }, "email": { "type": "string" }, "preferedLanguage": { "type": "string" } } }, "messageBatchPreparedFailedEvent": { "id": "messageBatchPreparedFailedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "messageBatch": { "$ref": "#/components/schemas/preparedFailedMessageBatch" } } }] }, "preparedFailedMessageBatch": { "id": "preparedFailedMessageBatch", "allOf": [{ "$ref": "#/components/schemas/messageBatchBase" }, { "type": "object", "additionalProperties": false, "properties": { "reason": { "type": "string" } } }] }, "messageBatchBase": { "id": "messageBatchBase", "type": "object", "additionalProperties": false, "properties": { "senderId": { "type": ["null", "string"], "format": "guid" }, "senderEmail": { "type": "string" }, "companyId": { "type": "string", "format": "guid" }, "jobId": { "type": ["null", "string"], "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "candidateInfo": { "type": "array", "items": { "$ref": "#/components/schemas/preparedCandidateBase" } }, "to": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "cc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "bcc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "attachments": { "type": "array", "items": { "$ref": "#/components/schemas/attachmentBase" } }, "inReplyTo": { "type": ["null", "string"] }, "references": { "type": ["null", "string"] }, "provider": { "$ref": "#/components/schemas/emailProviderTypes" } } }, "preparedCandidateBase": { "id": "preparedCandidateBase", "type": "object", "additionalProperties": false, "properties": { "candidateId": { "type": "string", "format": "guid" }, "messageId": { "type": "string", "format": "guid" }, "email": { "type": "string" }, "bodyUrl": { "type": "string" }, "subject": { "type": "string" } } }, "conversationParticipantBase": { "id": "conversationParticipantBase", "type": "object", "additionalProperties": false, "properties": { "userId": { "type": ["null", "string"], "format": "guid" }, "email": { "type": ["null", "string"] } } }, "attachmentBase": { "id": "attachmentBase", "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string" }, "url": { "type": "string" }, "sizeInBytes": { "type": "integer", "format": "int64" } } }, "emailProviderTypes": { "id": "emailProviderTypes", "type": "integer", "description": "", "x-enumNames": ["TalentLyft", "GoogleEmail", "Outlook", "Other", "TalentLyftLegacy"], "enum": [1, 2, 3, 4, -1] }, "messageSentEvent": { "id": "messageSentEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "message": { "$ref": "#/components/schemas/sentMessage" } } }] }, "sentMessage": { "id": "sentMessage", "type": "object", "additionalProperties": false, "properties": { "messageId": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "externalMessageId": { "type": "string" } } }, "messageUpdatedEvent": { "id": "messageUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "message": { "$ref": "#/components/schemas/updatedMessage" } } }] }, "updatedMessage": { "id": "updatedMessage", "type": "object", "additionalProperties": false, "properties": { "messageId": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "externalMessageId": { "type": "string" }, "type": { "$ref": "#/components/schemas/emailEventTypes" }, "description": { "type": ["null", "string"] }, "code": { "type": ["integer", "null"], "format": "int32" }, "recipientEmail": { "type": "string" } } }, "emailEventTypes": { "id": "emailEventTypes", "type": "integer", "description": "", "x-enumNames": ["Sent", "Bounced", "Delivered", "Dropped", "Spam", "Opened", "Clicked", "Replied", "Scheduled", "NotSent"], "enum": [0, 1, 2, 3, 4, 5, 6, 7, -2, -1] }, "sendingMessageFailedEvent": { "id": "sendingMessageFailedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "message": { "$ref": "#/components/schemas/sendingFailedMessage" } } }] }, "sendingFailedMessage": { "id": "sendingFailedMessage", "type": "object", "additionalProperties": false, "properties": { "messageId": { "type": "string", "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "reason": { "type": "string" } } }, "sendMessageRequestedEvent": { "id": "sendMessageRequestedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "message": { "$ref": "#/components/schemas/sendRequestedMessage" } } }] }, "sendRequestedMessage": { "id": "sendRequestedMessage", "allOf": [{ "$ref": "#/components/schemas/batchBase" }, { "type": "object", "additionalProperties": false, "properties": { "sendAt": { "type": ["null", "string"], "format": "date-time" } } }] }, "batchBase": { "id": "batchBase", "type": "object", "additionalProperties": false, "properties": { "senderId": { "type": ["null", "string"], "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "jobId": { "type": ["null", "string"], "format": "guid" }, "stageId": { "type": ["null", "string"], "format": "guid" }, "templateId": { "type": ["null", "string"], "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "bodyUrl": { "type": "string" }, "subject": { "type": "string" }, "preferedLanguage": { "type": ["null", "string"] }, "inReplyTo": { "type": ["null", "string"] }, "references": { "type": ["null", "string"] }, "candidates": { "type": "array", "items": { "$ref": "#/components/schemas/candidateBase" } }, "to": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "cc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "bcc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "attachments": { "type": "array", "items": { "$ref": "#/components/schemas/attachmentBase" } }, "provider": { "$ref": "#/components/schemas/emailProviderTypes" }, "visibility": { "$ref": "#/components/schemas/visibilityTypes" }, "subscription": { "$ref": "#/components/schemas/communicationSubscriptionTypes" } } }, "candidateBase": { "id": "candidateBase", "type": "object", "additionalProperties": false, "properties": { "email": { "type": ["null", "string"] }, "candidateId": { "type": "string", "format": "guid" }, "messageId": { "type": "string", "format": "guid" } } }, "visibilityTypes": { "id": "visibilityTypes", "type": "integer", "description": "", "x-enumNames": ["Everyone", "OnlyMe", "OnlyAdmins"], "enum": [1, 2, 3] }, "communicationSubscriptionTypes": { "id": "communicationSubscriptionTypes", "type": "integer", "description": "", "x-enumNames": ["JobOffersAndCompanyUpdates", "OneToOneCommunication", "OneTimeLegalBasisForCommunicating"], "enum": [1, 2, 3] }, "userUpdatedEvent": { "id": "userUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "user": { "$ref": "#/components/schemas/updatedUser" } } }] }, "updatedUser": { "id": "updatedUser", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "name": { "type": "string" }, "headline": { "type": ["null", "string"] }, "phone": { "type": ["null", "string"] }, "email": { "type": "string" }, "signature": { "type": ["null", "string"] } } } }, "messages": { "candidateUpdatedEvent": { "payload": { "$ref": "#/components/schemas/candidateUpdatedEvent" }, "name": "candidateUpdatedEvent" }, "companyUpdatedEvent": { "payload": { "$ref": "#/components/schemas/companyUpdatedEvent" }, "name": "companyUpdatedEvent" }, "messageBatchPreparedFailedEvent": { "payload": { "$ref": "#/components/schemas/messageBatchPreparedFailedEvent" }, "name": "messageBatchPreparedFailedEvent" }, "messageSentEvent": { "payload": { "$ref": "#/components/schemas/messageSentEvent" }, "name": "messageSentEvent" }, "messageUpdatedEvent": { "payload": { "$ref": "#/components/schemas/messageUpdatedEvent" }, "name": "messageUpdatedEvent" }, "sendingMessageFailedEvent": { "payload": { "$ref": "#/components/schemas/sendingMessageFailedEvent" }, "name": "sendingMessageFailedEvent" }, "sendMessageRequestedEvent": { "payload": { "$ref": "#/components/schemas/sendMessageRequestedEvent" }, "name": "sendMessageRequestedEvent" }, "userUpdatedEvent": { "payload": { "$ref": "#/components/schemas/userUpdatedEvent" }, "name": "userUpdatedEvent" } } } },
        { "asyncapi": "2.2.0", "info": { "title": "Services.Conversation.Preparer", "version": "1.0.0" }, "servers": { "nats": { "url": "nats.io", "protocol": "nats" } }, "defaultContentType": "application/json", "channels": { "v1.conversation.batch.prepared": { "publish": { "operationId": "PublishMessageBatchPreparedEvent", "summary": "", "message": { "$ref": "#/components/messages/messageBatchPreparedEvent" } } }, "v1.conversation.batch.prepare-failed": { "publish": { "operationId": "PublishMessageBatchPreparedFailedEvent", "summary": "", "message": { "$ref": "#/components/messages/messageBatchPreparedFailedEvent" } } }, "v1.conversation.message.prepared": { "publish": { "operationId": "PublishPreparedMessagesEventAsync", "summary": "", "message": { "$ref": "#/components/messages/messagesPreparedEvent" } } }, "v1.conversation.batch.ready.one-to-many": { "subscribe": { "operationId": "BatchReadyOneToManyHandler", "summary": "", "message": { "$ref": "#/components/messages/oneToManyBatchReadyEvent" } } }, "v1.conversation.batch.ready.one-to-one": { "subscribe": { "operationId": "BatchReadyOneToOneHandler", "summary": "", "message": { "$ref": "#/components/messages/oneToOneBatchReadyEvent" } } }, "v1.general.sync.candidate": { "subscribe": { "operationId": "CandidateSyncModelHandler", "summary": "", "message": { "$ref": "#/components/messages/candidateUpdatedEvent" } } }, "v1.general.sync.company": { "subscribe": { "operationId": "CompanyUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/companyUpdatedEvent" } } }, "v1.general.sync.job": { "subscribe": { "operationId": "JobUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/jobUpdatedEvent" } } }, "v1.general.sync.localization-string": { "subscribe": { "operationId": "LocalizationStringUpdatedEventHandler", "summary": "", "message": { "$ref": "#/components/messages/localizationStringUpdatedEvent" } } }, "v1.general.sync.user": { "subscribe": { "operationId": "UserUpdatedEvent", "summary": "", "message": { "$ref": "#/components/messages/userUpdatedEvent" } } } }, "components": { "schemas": { "messageBatchPreparedEvent": { "id": "messageBatchPreparedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "messageBatch": { "$ref": "#/components/schemas/preparedMessageBatch" } } }] }, "preparedMessageBatch": { "id": "preparedMessageBatch", "allOf": [{ "$ref": "#/components/schemas/messageBatchBase" }, { "type": "object", "additionalProperties": false }] }, "messageBatchBase": { "id": "messageBatchBase", "type": "object", "additionalProperties": false, "properties": { "senderId": { "type": ["null", "string"], "format": "guid" }, "senderEmail": { "type": "string" }, "companyId": { "type": "string", "format": "guid" }, "jobId": { "type": ["null", "string"], "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "candidateInfo": { "type": "array", "items": { "$ref": "#/components/schemas/preparedCandidateBase" } }, "to": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "cc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "bcc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "attachments": { "type": "array", "items": { "$ref": "#/components/schemas/attachmentBase" } }, "inReplyTo": { "type": ["null", "string"] }, "references": { "type": ["null", "string"] }, "provider": { "$ref": "#/components/schemas/emailProviderTypes" } } }, "preparedCandidateBase": { "id": "preparedCandidateBase", "type": "object", "additionalProperties": false, "properties": { "candidateId": { "type": "string", "format": "guid" }, "messageId": { "type": "string", "format": "guid" }, "email": { "type": "string" }, "bodyUrl": { "type": "string" }, "subject": { "type": "string" } } }, "conversationParticipantBase": { "id": "conversationParticipantBase", "type": "object", "additionalProperties": false, "properties": { "userId": { "type": ["null", "string"], "format": "guid" }, "email": { "type": ["null", "string"] } } }, "attachmentBase": { "id": "attachmentBase", "type": "object", "additionalProperties": false, "properties": { "name": { "type": "string" }, "url": { "type": "string" }, "sizeInBytes": { "type": "integer", "format": "int64" } } }, "emailProviderTypes": { "id": "emailProviderTypes", "type": "integer", "description": "", "x-enumNames": ["TalentLyft", "GoogleEmail", "Outlook", "Other", "TalentLyftLegacy"], "enum": [1, 2, 3, 4, -1] }, "eventBase": { "id": "eventBase", "type": "object", "x-abstract": true, "additionalProperties": false, "properties": { "timeStamp": { "type": "string", "format": "date-time" } } }, "messageBatchPreparedFailedEvent": { "id": "messageBatchPreparedFailedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "messageBatch": { "$ref": "#/components/schemas/preparedFailedMessageBatch" } } }] }, "preparedFailedMessageBatch": { "id": "preparedFailedMessageBatch", "allOf": [{ "$ref": "#/components/schemas/messageBatchBase" }, { "type": "object", "additionalProperties": false, "properties": { "reason": { "type": "string" } } }] }, "messagesPreparedEvent": { "id": "messagesPreparedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "messages": { "$ref": "#/components/schemas/preparedMessages" } } }] }, "preparedMessages": { "id": "preparedMessages", "type": "object", "additionalProperties": false, "properties": { "companyId": { "type": "string", "format": "guid" }, "messages": { "type": "array", "items": { "$ref": "#/components/schemas/preparedMessage" } } } }, "preparedMessage": { "id": "preparedMessage", "type": "object", "additionalProperties": false, "properties": { "messageId": { "type": "string", "format": "guid" }, "preparedBodyUrl": { "type": "string" }, "preparedSubject": { "type": "string" } } }, "oneToManyBatchReadyEvent": { "id": "oneToManyBatchReadyEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "batch": { "$ref": "#/components/schemas/oneToManyBatch" } } }] }, "oneToManyBatch": { "id": "oneToManyBatch", "allOf": [{ "$ref": "#/components/schemas/batchBase" }, { "type": "object", "additionalProperties": false }] }, "batchBase": { "id": "batchBase", "type": "object", "additionalProperties": false, "properties": { "senderId": { "type": ["null", "string"], "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "jobId": { "type": ["null", "string"], "format": "guid" }, "stageId": { "type": ["null", "string"], "format": "guid" }, "templateId": { "type": ["null", "string"], "format": "guid" }, "campaignId": { "type": "string", "format": "guid" }, "bodyUrl": { "type": "string" }, "subject": { "type": "string" }, "preferedLanguage": { "type": ["null", "string"] }, "inReplyTo": { "type": ["null", "string"] }, "references": { "type": ["null", "string"] }, "candidates": { "type": "array", "items": { "$ref": "#/components/schemas/candidateBase" } }, "to": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "cc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "bcc": { "type": "array", "items": { "$ref": "#/components/schemas/conversationParticipantBase" } }, "attachments": { "type": "array", "items": { "$ref": "#/components/schemas/attachmentBase" } }, "provider": { "$ref": "#/components/schemas/emailProviderTypes" }, "visibility": { "$ref": "#/components/schemas/visibilityTypes" }, "subscription": { "$ref": "#/components/schemas/communicationSubscriptionTypes" } } }, "candidateBase": { "id": "candidateBase", "type": "object", "additionalProperties": false, "properties": { "email": { "type": ["null", "string"] }, "candidateId": { "type": "string", "format": "guid" }, "messageId": { "type": "string", "format": "guid" } } }, "visibilityTypes": { "id": "visibilityTypes", "type": "integer", "description": "", "x-enumNames": ["Everyone", "OnlyMe", "OnlyAdmins"], "enum": [1, 2, 3] }, "communicationSubscriptionTypes": { "id": "communicationSubscriptionTypes", "type": "integer", "description": "", "x-enumNames": ["JobOffersAndCompanyUpdates", "OneToOneCommunication", "OneTimeLegalBasisForCommunicating"], "enum": [1, 2, 3] }, "oneToOneBatchReadyEvent": { "id": "oneToOneBatchReadyEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "batch": { "$ref": "#/components/schemas/oneToOneBatch" } } }] }, "oneToOneBatch": { "id": "oneToOneBatch", "allOf": [{ "$ref": "#/components/schemas/batchBase" }, { "type": "object", "additionalProperties": false }] }, "candidateUpdatedEvent": { "id": "candidateUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "candidate": { "$ref": "#/components/schemas/updatedCandidate" } } }] }, "updatedCandidate": { "id": "updatedCandidate", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "email": { "type": ["null", "string"] }, "phone": { "type": ["null", "string"] }, "firstName": { "type": "string" }, "lastName": { "type": ["null", "string"] }, "currentJobTitle": { "type": ["null", "string"] }, "currentCompany": { "type": ["null", "string"] }, "salutation": { "oneOf": [{ "type": "null" }, { "$ref": "#/components/schemas/salutationTypes" }] }, "preferredLanguage": { "type": ["null", "string"] }, "portalLoginUrl": { "type": "string" }, "portalConsentUrl": { "type": "string" }, "isUnsubscribed": { "type": "boolean" }, "unsubscribedAt": { "type": ["null", "string"], "format": "date-time" }, "isUnsubscribedOneOnOne": { "type": "boolean" }, "unsubscribedOneOnOneAt": { "type": ["null", "string"], "format": "date-time" } } }, "salutationTypes": { "id": "salutationTypes", "type": "integer", "description": "", "x-enumNames": ["Other", "Mr", "Mrs", "Miss"], "enum": [0, 1, 2, 3] }, "companyUpdatedEvent": { "id": "companyUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "company": { "$ref": "#/components/schemas/updatedCompany" } } }] }, "updatedCompany": { "id": "updatedCompany", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "name": { "type": "string" }, "website": { "type": ["null", "string"] }, "careerPageUrl": { "type": "string" }, "email": { "type": "string" }, "preferedLanguage": { "type": "string" } } }, "jobUpdatedEvent": { "id": "jobUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "job": { "$ref": "#/components/schemas/updatedJob" } } }] }, "updatedJob": { "id": "updatedJob", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "title": { "type": "string" }, "jobFullUrl": { "type": "string" }, "jobLocation": { "type": "string" } } }, "localizationStringUpdatedEvent": { "id": "localizationStringUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "localizationString": { "$ref": "#/components/schemas/updatedLocalizationString" } } }] }, "updatedLocalizationString": { "id": "updatedLocalizationString", "type": "object", "additionalProperties": false, "properties": { "rkName": { "type": "string" }, "languageCode": { "type": "string" }, "value": { "type": "string" } } }, "userUpdatedEvent": { "id": "userUpdatedEvent", "allOf": [{ "$ref": "#/components/schemas/eventBase" }, { "type": "object", "additionalProperties": false, "properties": { "user": { "$ref": "#/components/schemas/updatedUser" } } }] }, "updatedUser": { "id": "updatedUser", "type": "object", "additionalProperties": false, "properties": { "id": { "type": "string", "format": "guid" }, "companyId": { "type": "string", "format": "guid" }, "name": { "type": "string" }, "headline": { "type": ["null", "string"] }, "phone": { "type": ["null", "string"] }, "email": { "type": "string" }, "signature": { "type": ["null", "string"] } } } }, "messages": { "messageBatchPreparedEvent": { "payload": { "$ref": "#/components/schemas/messageBatchPreparedEvent" }, "name": "messageBatchPreparedEvent" }, "messageBatchPreparedFailedEvent": { "payload": { "$ref": "#/components/schemas/messageBatchPreparedFailedEvent" }, "name": "messageBatchPreparedFailedEvent" }, "messagesPreparedEvent": { "payload": { "$ref": "#/components/schemas/messagesPreparedEvent" }, "name": "messagesPreparedEvent" }, "oneToManyBatchReadyEvent": { "payload": { "$ref": "#/components/schemas/oneToManyBatchReadyEvent" }, "name": "oneToManyBatchReadyEvent" }, "oneToOneBatchReadyEvent": { "payload": { "$ref": "#/components/schemas/oneToOneBatchReadyEvent" }, "name": "oneToOneBatchReadyEvent" }, "candidateUpdatedEvent": { "payload": { "$ref": "#/components/schemas/candidateUpdatedEvent" }, "name": "candidateUpdatedEvent" }, "companyUpdatedEvent": { "payload": { "$ref": "#/components/schemas/companyUpdatedEvent" }, "name": "companyUpdatedEvent" }, "jobUpdatedEvent": { "payload": { "$ref": "#/components/schemas/jobUpdatedEvent" }, "name": "jobUpdatedEvent" }, "localizationStringUpdatedEvent": { "payload": { "$ref": "#/components/schemas/localizationStringUpdatedEvent" }, "name": "localizationStringUpdatedEvent" }, "userUpdatedEvent": { "payload": { "$ref": "#/components/schemas/userUpdatedEvent" }, "name": "userUpdatedEvent" } } } }
    ];


    getData(): any {
        return this.asyncApiRawData;
    }

    getEvents(): any {
        let result: any[] = [];
        this.asyncApiRawData.forEach(e => {
            Object.values(e.components.messages).forEach((message: any) => {
                if (result.find(x => x.name === message.name) === undefined) {
                    result.push(message);
                }
            });
        });
        return result;
    }

    getSchemas(): any {
        let result: any[] = [];
        this.asyncApiRawData.forEach(e => {
            Object.values(e.components.schemas).forEach((message: any) => {
                if (result.find(x => x.id === message.id) === undefined) {
                    result.push(message);
                }
            });
        });
        return result;
    }

    getDetailsForMessage(message: any) {
        var result: any = {
            schemas: [],
            publishers: [],
            subscribers: []
        };
        console.log(message);
        var targetMessageName = message.name;

        //#region Publishers and Subscribers
        this.asyncApiRawData.forEach((doc: any) => {

            var subjects = Object.keys(doc.channels);

            subjects.forEach((subject: string) => {
                var definition = doc.channels[subject];
                if (definition.publish) {
                    var messageRef = definition.publish.message.$ref;
                    var messageName = messageRef.substring(messageRef.lastIndexOf('/') + 1);
                    if (messageName === targetMessageName) {
                        result.publishers.push({
                            serviceInfo: doc.info,
                            protocol: doc.servers,
                            subject: subject,
                            handler: definition.publish.operationId
                        });
                    }
                }
                if (definition.subscribe) {
                    var messageRef = definition.subscribe.message.$ref;
                    var messageName = messageRef.substring(messageRef.lastIndexOf('/') + 1);
                    if (messageName === targetMessageName) {
                        result.subscribers.push({
                            serviceInfo: doc.info,
                            protocol: doc.servers,
                            subject: subject,
                            handler: definition.subscribe.operationId
                        });
                    }
                }


            });

        });
        //#endregion

        //#region Schemas
        var rootSchemaFound = false;
        this.asyncApiRawData.forEach((doc: any) => {
            if (rootSchemaFound) {
                return;
            }

            var schema = Object.values(doc.components.schemas).find((x: any) => x.id === targetMessageName);
            if (schema) {
                result.schemas.push(schema);
                rootSchemaFound = true;
                return;
            }
        });
        //#endregion
        console.log("Result: ", result);
        return result;
    }

}
