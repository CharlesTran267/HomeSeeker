package com.example.demo.house;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class house {
    @Id
    @SequenceGenerator(
            name = "house_sequence",
            sequenceName = "house_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "house_sequence"
    )
    private Long id;
    private String location;
    private String communityName;
    private String address;
    private Long expectedPrice;
    private Long floorArea;
    private String name;
    private Long contactNo;
    private String imageURL;

    public house( String location, String communityName, String address, Long expectedPrice, Long floorArea, String name, Long contactNo, String imageURL) {
        this.location = location;
        this.communityName = communityName;
        this.address = address;
        this.expectedPrice = expectedPrice;
        this.floorArea = floorArea;
        this.name = name;
        this.contactNo = contactNo;
        this.imageURL = imageURL;
    }

}
