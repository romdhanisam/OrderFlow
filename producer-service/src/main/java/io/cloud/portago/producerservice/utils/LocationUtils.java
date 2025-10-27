package io.cloud.portago.producerservice.utils;

import java.util.concurrent.ThreadLocalRandom;

public class LocationUtils {
    public static double randomLat() {
        return ThreadLocalRandom.current().nextDouble(-90.0, 90.0);
    }
    public static double randomLng() {
        return ThreadLocalRandom.current().nextDouble(-180.0, 180.0);
    }
}
