module onboarding::onboarding {
    use std::string;
    use std::signer;

    struct UserProfile has key, store {
        name: string::String,
        age: u8,
        gender: string::String,
        chronic_conditions: vector<string::String>,
        preferred_walk_time: string::String,
        pollution_sensitivity: string::String,
        location: string::String,
    }

    public entry fun set_profile(
        account: &signer,
        name: string::String,
        age: u8,
        gender: string::String,
        chronic_conditions: vector<string::String>,
        preferred_walk_time: string::String,
        pollution_sensitivity: string::String,
        location: string::String,
    ) {
        let profile = UserProfile {
            name,
            age,
            gender,
            chronic_conditions,
            preferred_walk_time,
            pollution_sensitivity,
            location,
        };
        move_to(account, profile);
    }

    public fun get_profile(account: address): &UserProfile acquires UserProfile {
        borrow_global<UserProfile>(account)
    }
} 