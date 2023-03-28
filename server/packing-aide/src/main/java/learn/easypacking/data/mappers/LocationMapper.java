package learn.easypacking.data.mappers;

import learn.easypacking.models.Location;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper<Location> {
    @Override
    public Location mapRow(ResultSet rs, int i) throws SQLException {
        Location location = new Location();
        location.setLocationId(rs.getInt("location_id"));
        location.setStreetAddress(rs.getString("street_address"));
        location.setCity(rs.getString("city"));
        location.setZip(rs.getInt("zip"));
        location.setState(rs.getString("state"));
        location.setState(rs.getString("country"));
        return location;
    }
}
