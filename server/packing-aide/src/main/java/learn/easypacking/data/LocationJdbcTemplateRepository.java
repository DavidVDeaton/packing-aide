package learn.easypacking.data;

import learn.easypacking.data.mappers.LocationMapper;
import learn.easypacking.models.Location;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class LocationJdbcTemplateRepository implements LocationRepository{

    private final JdbcTemplate jdbcTemplate;

    public LocationJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Location findById(int locationId) {
        String sqlStatement = "Select * from location where location_id =?; ";
        return jdbcTemplate.query(sqlStatement, new LocationMapper(), locationId).stream()
                .findFirst()
                .orElse(null);
    }

    @Override
    public Location createLocation(Location location) {
        String sqlStatement = "Insert into location (street_address, city, zip, state) values" +
                "(?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, location.getStreetAddress());
            ps.setString(2, location.getCity());
            ps.setInt(3, location.getZip());
            ps.setString(4, location.getState());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }
        location.setLocationId(keyHolder.getKey().intValue());
        return location;
    }

    @Override
    public boolean updateLocation(Location location) {
        String sqlStatement = "update location set " +
                "street_address = ?, " +
                "city = ?, " +
                "zip = ?, " +
                "state = ? " +
                "where location_id = ?;";
        return jdbcTemplate.update(sqlStatement,
                location.getStreetAddress(), location.getCity(), location.getZip(), location.getState(), location.getLocationId()) > 0;
    }

    //Should delete exist for location if it is always tied to an event? Location will never exist on its own, it will always be created through an event
//    @Override
//    @Transactional
//    public boolean deleteLocation(int locationId) {
//        jdbcTemplate.update("delete from `event` where start_location_id = ?", locationId);
//        jdbcTemplate.update("delete from `event` where end_location_id = ?", locationId);
//        return jdbcTemplate.update("delete from location where location_id = ?", locationId) > 0;
//    }
}
