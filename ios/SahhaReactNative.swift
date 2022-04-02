import SwiftUI
import Sahha

@objc(SahhaReactNative)
class SahhaReactNative: NSObject {
    
    var storedValue: Int = 0
    override init() {
        super.init()
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
      return false
    }
    
    @objc func constantsToExport() -> [AnyHashable : Any]! {
        return ["message": "how are you?"]
    }
    
    enum SahhaSettingsIdentifier: String {
        case environment
        case sensors
        case postActivityManually
    }
    
    @objc(configure:callback:)
    func configure(_ settings: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
                
        if let configSettings = settings as? [String: Any], let environment = configSettings[SahhaSettingsIdentifier.environment.rawValue] as? String, let configEnvironment: SahhaEnvironment = SahhaEnvironment(rawValue: environment) {
            
            var configSensors: Set<SahhaSensor>? = []
            if let sensors = configSettings[SahhaSettingsIdentifier.sensors.rawValue] as? [String] {
                for sensor in sensors {
                    if let configSensor = SahhaSensor(rawValue: sensor) {
                        configSensors?.insert(configSensor)
                    }
                }
            } else {
                configSensors = nil
            }
            
            let postActivityManually: Bool? = configSettings[SahhaSettingsIdentifier.postActivityManually.rawValue] as? Bool
            
            let settings = SahhaSettings(environment: configEnvironment, sensors: configSensors, postActivityManually: postActivityManually)
            
            Sahha.configure(settings)
            
            // Needed for React Native since native iOS lifecycle is delayed at launch
            Sahha.launch()
            
            callback([NSNull(), true])
        } else {
            callback(["Sahha settings are invalid", false])
        }
    }
    
    @objc(activate:)
    func activate(_ callback: @escaping RCTResponseSenderBlock) {
        Sahha.motion.activate { newStatus in
            callback([newStatus.rawValue])
        }
    }
    
    @objc(authenticate:profileId:callback:)
    func authenticate(_ customerId: String, profileId: String, callback: @escaping RCTResponseSenderBlock) -> Void {
        Sahha.authenticate(customerId: customerId, profileId: profileId) { error, value in
            callback([error ?? NSNull(), value ?? NSNull()])
        }
    }
    
    @objc(activate:callback:)
    func activate(_ activity: String, callback: @escaping RCTResponseSenderBlock) -> Void {
        switch SahhaActivity(rawValue: activity) {
        case .motion:
            Sahha.motion.activate { value in
                callback([NSNull(),value.rawValue])
            }
        case .health:
            Sahha.health.activate { value in
                callback([NSNull(),value.rawValue])
            }
        default:
            callback(["\(activity) is not a valid Sahha activity",NSNull()])
        }
    }
    
    @objc(promptUserToActivate:callback:)
    func promptUserToActivate(_ activity: String, callback: @escaping RCTResponseSenderBlock) -> Void {
        switch SahhaActivity(rawValue: activity) {
        case .motion:
            Sahha.motion.activate { value in
                callback([NSNull(),value.rawValue])
            }
        case .health:
            Sahha.health.activate { value in
                callback([NSNull(),value.rawValue])
            }
        default:
            callback(["\(activity) is not a valid Sahha activity",NSNull()])
        }
    }
    
    @objc(activityStatus:callback:)
    func activityStatus(_ activity: String, callback: @escaping RCTResponseSenderBlock) -> Void {
        switch SahhaActivity(rawValue: activity) {
        case .motion:
            callback([NSNull(), Sahha.motion.activityStatus.rawValue])
        case .health:
            callback([NSNull(), Sahha.health.activityStatus.rawValue])
        default:
            callback(["\(activity) is not a valid Sahha activity",NSNull()])
        }
    }
    
    @objc(postActivity:callback:)
    func postActivity(_ activity: String, callback: @escaping RCTResponseSenderBlock) -> Void {
        switch SahhaActivity(rawValue: activity) {
        case .motion:
            Sahha.motion.postActivity { error, success in
                callback([error ?? NSNull(), success])
            }
        case .health:
            Sahha.health.postActivity { error, success in
                callback([error ?? NSNull(), success])
            }
        default:
            callback(["\(activity) is not a valid Sahha activity", false])
        }
    }
    
    @objc(openAppSettings)
    func openAppSettings() -> Void {
        Sahha.openAppSettings()
    }
    
    @objc(speak:onFailure:)
    func speak(_ onSuccess: RCTPromiseResolveBlock, onFailure: RCTPromiseRejectBlock) -> Void {
        onSuccess("hello")
        //onFailure("Nope!", "Try again!", SahhaError.woops)
    }
}
