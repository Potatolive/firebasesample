/**
 * Social Message API
 * No descripton provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import * as models from './models';

export interface SocialPost {
    

    id?: string;

    uid?: string;

    feedId?: string;

    profileId?: string;

    profileName?: string;

    profileImageUrl?: string;

    postText?: string;

    postMediaUrl?: string;

    postMediaType?: SocialPost.PostMediaTypeEnum;

    postedOn?: string;

    rawPost?: any;

    tags?: Array<string>;

    metaData?: any;

    approvalStatus?: SocialPost.ApprovalStatusEnum;
}
export namespace SocialPost {

    export enum PostMediaTypeEnum { 
        none = <any> 'none',
        image = <any> 'image',
        video = <any> 'video',
        audio = <any> 'audio',
    }

    export enum ApprovalStatusEnum { 
        new = <any> 'new',
        approved = <any> 'approved',
        rejected = <any> 'rejected',
        deleted = <any> 'deleted',
    }
}
