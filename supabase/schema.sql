CREATE TABLE survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  time_spent_searching TEXT,
  missed_work BOOLEAN,
  frustration_level INTEGER,
  prefers_hardware_status BOOLEAN,
  floor_tracking_enough BOOLEAN,
  prefers_digital_notice BOOLEAN,
  wants_mobile_app BOOLEAN,
  notification_useful BOOLEAN,
  cabin_check_reliable BOOLEAN,
  preferred_platform TEXT,
  relies_on_word_of_mouth BOOLEAN,
  importance_of_status INTEGER,
  schedule_tracking_difficult BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);
