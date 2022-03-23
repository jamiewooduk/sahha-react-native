#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SahhaReactNative, NSObject)

RCT_EXTERN_METHOD(configure)

RCT_EXTERN_METHOD(activate:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(authenticate:(NSString *)customerId profileId:(NSString *)profileId callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(activate:(NSString *)activity callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(promptUserToActivate:(NSString *)activity callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(activityStatus:(NSString *)activity callback:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(squareUp:(int)value
                  onSuccess:(RCTPromiseResolveBlock)resolve
                  onFailure:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(squareUp:(int)value
                  onSuccess:(RCTPromiseResolveBlock)resolve
                  onFailure:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiply:(float)a b:(float)b
                  onSuccess:(RCTPromiseResolveBlock)resolve
                  onFailure:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(add:(RCTPromiseResolveBlock)resolve
                  onFailure:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(speak:(RCTPromiseResolveBlock)resolve
                  onFailure:(RCTPromiseRejectBlock)reject)

@end
